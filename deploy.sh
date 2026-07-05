#!/usr/bin/env bash
# ════════════════════════════════════════════
# DTx-GI Platform - 本地快速部署脚本
# 用法: ./deploy.sh [dev|staging|production]
# ════════════════════════════════════════════

set -euo pipefail

# ── 颜色定义 ──
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# ── 配置 ──
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="dtx-gi-platform"
NODE_MIN_VERSION="20"
BUILD_DIR="dist"

# ── 环境选择 ──
ENVIRONMENT="${1:-production}"
shift 2>/dev/null || true

case "$ENVIRONMENT" in
  dev|development)
    ENVIRONMENT="dev"
    WRANGLER_ENV="--env dev"
    ;;
  staging|stage)
    ENVIRONMENT="staging"
    WRANGLER_ENV="--env staging"
    ;;
  prod|production)
    ENVIRONMENT="production"
    WRANGLER_ENV=""
    ;;
  *)
    echo -e "${RED}❌ 错误: 未知环境 '$ENVIRONMENT'${RESET}"
    echo -e "${YELLOW}用法: ./deploy.sh [dev|staging|production]${RESET}"
    exit 1
    ;;
esac

# ── 辅助函数 ──
log_info() {
  echo -e "${BLUE}ℹ️  ${1}${RESET}"
}

log_success() {
  echo -e "${GREEN}✅ ${1}${RESET}"
}

log_warn() {
  echo -e "${YELLOW}⚠️  ${1}${RESET}"
}

log_error() {
  echo -e "${RED}❌ ${1}${RESET}"
}

log_step() {
  echo -e "${CYAN}${BOLD}▶ ${1}${RESET}"
}

print_banner() {
  echo ""
  echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════════╗${RESET}"
  echo -e "${BOLD}${CYAN}║       DTx-GI Platform 部署脚本                  ║${RESET}"
  echo -e "${BOLD}${CYAN}║       环境: ${GREEN}${ENVIRONMENT}${CYAN}                          ║${RESET}"
  echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════════╝${RESET}"
  echo ""
}

# ── 检查环境变量 ──
check_env() {
  log_step "检查环境变量..."

  local missing_vars=()

  if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
    missing_vars+=("CLOUDFLARE_API_TOKEN")
  fi

  if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
    missing_vars+=("CLOUDFLARE_ACCOUNT_ID")
  fi

  if [[ ${#missing_vars[@]} -gt 0 ]]; then
    log_error "缺少以下环境变量:"
    for var in "${missing_vars[@]}"; do
      echo -e "  ${RED}• ${var}${RESET}"
    done
    echo ""
    log_info "请设置环境变量后再运行:"
    echo -e "  ${YELLOW}export CLOUDFLARE_API_TOKEN=your_api_token${RESET}"
    echo -e "  ${YELLOW}export CLOUDFLARE_ACCOUNT_ID=d01842cc5760b9f6274f2df70fe791dc${RESET}"
    exit 1
  fi

  log_success "环境变量检查通过"
}

# ── 检查 Node.js 版本 ──
check_node() {
  log_step "检查 Node.js 版本..."

  if ! command -v node &> /dev/null; then
    log_error "未找到 Node.js，请先安装 Node.js ${NODE_MIN_VERSION}+"
    exit 1
  fi

  local node_version
  node_version=$(node --version | sed 's/v//')
  local major_version
  major_version=$(echo "$node_version" | cut -d. -f1)

  if [[ "$major_version" -lt "$NODE_MIN_VERSION" ]]; then
    log_error "Node.js 版本过低: ${node_version} (需要 >= ${NODE_MIN_VERSION})"
    exit 1
  fi

  log_success "Node.js ${node_version} ✓"

  # 检查 npm
  if ! command -v npm &> /dev/null; then
    log_error "未找到 npm"
    exit 1
  fi

  local npm_version
  npm_version=$(npm --version)
  log_success "npm ${npm_version} ✓"
}

# ── 检查 wrangler ──
check_wrangler() {
  log_step "检查 Wrangler CLI..."

  if ! command -v wrangler &> /dev/null; then
    log_warn "未安装 Wrangler CLI，正在安装..."
    npm install -g wrangler@latest
  fi

  local wrangler_version
  wrangler_version=$(wrangler --version)
  log_success "Wrangler ${wrangler_version} ✓"
}

# ── 安装依赖 ──
install_deps() {
  log_step "安装项目依赖..."

  cd "$SCRIPT_DIR"

  if [[ -f "package-lock.json" ]]; then
    npm ci --prefer-offline --no-audit --no-fund
  else
    log_warn "未找到 package-lock.json，使用 npm install"
    npm install --no-audit --no-fund
  fi

  log_success "依赖安装完成"
}

# ── 代码质量检查 ──
lint_check() {
  log_step "运行代码检查..."

  cd "$SCRIPT_DIR"

  # ESLint
  if npm run lint --silent 2>/dev/null; then
    log_success "ESLint 检查通过"
  elif npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings=0 2>/dev/null; then
    log_success "ESLint 检查通过"
  else
    log_warn "ESLint 检查未通过或配置不存在，继续部署..."
  fi

  # Prettier
  if npx prettier --check "src/**/*.{ts,tsx,js,jsx,json,css,md}" --silent 2>/dev/null; then
    log_success "Prettier 检查通过"
  else
    log_warn "Prettier 格式检查未通过，运行 'npm run format' 修复"
  fi

  # TypeScript 类型检查
  if npx tsc --noEmit --pretty 2>/dev/null; then
    log_success "TypeScript 类型检查通过"
  else
    log_warn "TypeScript 类型检查未通过，继续部署..."
  fi
}

# ── 构建项目 ──
build_project() {
  log_step "构建生产环境... (${ENVIRONMENT})"

  cd "$SCRIPT_DIR"

  export NODE_ENV=production
  export VITE_APP_VERSION="$(git rev-parse --short HEAD 2>/dev/null || echo 'local')"
  export VITE_APP_BUILD_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

  npm run build

  if [[ ! -d "$BUILD_DIR" ]]; then
    log_error "构建输出目录 '$BUILD_DIR' 不存在"
    exit 1
  fi

  local build_size
  build_size=$(du -sh "$BUILD_DIR" | cut -f1)
  log_success "构建完成 (输出大小: ${build_size})"
}

# ── 部署到 Cloudflare ──
deploy_to_cloudflare() {
  log_step "部署到 Cloudflare Pages (${ENVIRONMENT})..."

  cd "$SCRIPT_DIR"

  log_info "账户 ID: ${CLOUDFLARE_ACCOUNT_ID}"
  log_info "项目名: ${PROJECT_NAME}"

  wrangler pages deploy "$BUILD_DIR" \
    --project-name="$PROJECT_NAME" \
    --branch="$ENVIRONMENT" \
    ${WRANGLER_ENV} \
    --commit-hash="$(git rev-parse HEAD 2>/dev/null || echo 'unknown')" \
    --commit-message="$(git log -1 --pretty=%B 2>/dev/null || echo 'Local deploy')"

  log_success "部署成功!"
  echo ""
}

# ── 打印部署信息 ──
print_deploy_info() {
  echo ""
  echo -e "${BOLD}${GREEN}══════════════════════════════════════════════════${RESET}"
  echo -e "${BOLD}${GREEN}  🎉 DTx-GI Platform 部署完成!                  ${RESET}"
  echo -e "${BOLD}${GREEN}══════════════════════════════════════════════════${RESET}"
  echo ""
  echo -e "  ${BOLD}环境:${RESET}       ${CYAN}${ENVIRONMENT}${RESET}"
  echo -e "  ${BOLD}项目:${RESET}       ${CYAN}${PROJECT_NAME}${RESET}"
  echo -e "  ${BOLD}构建目录:${RESET}   ${CYAN}${BUILD_DIR}/${RESET}"
  echo -e "  ${BOLD}构建时间:${RESET}   ${CYAN}$(date '+%Y-%m-%d %H:%M:%S')${RESET}"

  if [[ "$ENVIRONMENT" == "production" ]]; then
    echo -e "  ${BOLD}访问地址:${RESET}   ${GREEN}https://${PROJECT_NAME}.pages.dev${RESET}"
  elif [[ "$ENVIRONMENT" == "staging" ]]; then
    echo -e "  ${BOLD}访问地址:${RESET}   ${GREEN}https://dev.${PROJECT_NAME}.pages.dev${RESET}"
  else
    echo -e "  ${BOLD}访问地址:${RESET}   ${GREEN}https://pr-local.${PROJECT_NAME}.pages.dev${RESET}"
  fi

  echo ""
  echo -e "  ${YELLOW}提示:${RESET}"
  echo -e "    • 部署可能需要几分钟才能在全网生效"
  echo -e "    • 可通过 Cloudflare Dashboard 查看详细日志"
  echo -e "    • 使用 'wrangler pages deployment list' 查看部署历史"
  echo ""
}

# ── 清理 ──
cleanup() {
  if [[ -d "$SCRIPT_DIR/$BUILD_DIR" ]]; then
    log_info "清理构建目录..."
    rm -rf "$SCRIPT_DIR/$BUILD_DIR"
  fi
}

# ── 主流程 ──
main() {
  print_banner
  check_env
  check_node
  check_wrangler
  install_deps
  lint_check
  build_project
  deploy_to_cloudflare
  print_deploy_info
}

# ── 信号处理 ──
trap 'log_error "部署被中断"; exit 130' INT TERM

# ── 入口 ──
main "$@"
