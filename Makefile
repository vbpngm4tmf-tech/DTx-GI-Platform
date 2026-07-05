# ════════════════════════════════════════════
# DTx-GI Platform - Makefile
# 常用命令快捷方式
# ════════════════════════════════════════════

.PHONY: help dev build deploy deploy-staging deploy-dev lint lint-fix format type-check test test-watch clean install preview

# ── 默认目标 ──
.DEFAULT_GOAL := help

# ── 颜色定义 ──
BLUE := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m
BOLD := \033[1m

# ── 帮助 ──
help: ## 显示帮助信息
	@echo ""
	@echo "$(BOLD)DTx-GI Platform - 可用命令$(RESET)"
	@echo "═══════════════════════════════════════════════════════════════"
	@echo ""
	@echo "$(BOLD)$(GREEN)开发$(RESET)"
	@echo "  $(BLUE)make dev$(RESET)           启动本地开发服务器"
	@echo "  $(BLUE)make install$(RESET)       安装/更新依赖"
	@echo "  $(BLUE)make preview$(RESET)       预览生产构建"
	@echo ""
	@echo "$(BOLD)$(GREEN)构建$(RESET)"
	@echo "  $(BLUE)make build$(RESET)         生产环境构建"
	@echo "  $(BLUE)make build-dev$(RESET)     开发环境构建"
	@echo ""
	@echo "$(BOLD)$(GREEN)代码质量$(RESET)"
	@echo "  $(BLUE)make lint$(RESET)          运行 ESLint 检查"
	@echo "  $(BLUE)make lint-fix$(RESET)      自动修复 ESLint 问题"
	@echo "  $(BLUE)make format$(RESET)        运行 Prettier 格式化"
	@echo "  $(BLUE)make format-check$(RESET)  检查代码格式"
	@echo "  $(BLUE)make type-check$(RESET)    运行 TypeScript 类型检查"
	@echo ""
	@echo "$(BOLD)$(GREEN)测试$(RESET)"
	@echo "  $(BLUE)make test$(RESET)          运行所有测试"
	@echo "  $(BLUE)make test-watch$(RESET)    监听模式运行测试"
	@echo "  $(BLUE)make test-coverage$(RESET) 运行测试并生成覆盖率报告"
	@echo ""
	@echo "$(BOLD)$(GREEN)部署$(RESET)"
	@echo "  $(BLUE)make deploy$(RESET)        部署到生产环境 (Cloudflare Pages)"
	@echo "  $(BLUE)make deploy-staging$(RESET) 部署到预发布环境"
	@echo "  $(BLUE)make deploy-dev$(RESET)    部署到开发环境"
	@echo ""
	@echo "$(BOLD)$(GREEN)维护$(RESET)"
	@echo "  $(BLUE)make clean$(RESET)         清理构建产物和缓存"
	@echo "  $(BLUE)make clean-all$(RESET)     清理所有（包括 node_modules）"
	@echo "  $(BLUE)make update-deps$(RESET)   更新所有依赖到最新版本"
	@echo ""
	@echo "═══════════════════════════════════════════════════════════════"

# ── 开发 ──
dev: ## 启动本地开发服务器
	@echo "$(GREEN)🚀 启动开发服务器...$(RESET)"
	npm run dev

install: ## 安装/更新依赖
	@echo "$(GREEN)📦 安装依赖...$(RESET)"
	npm ci --prefer-offline --no-audit --no-fund

preview: ## 预览生产构建
	@echo "$(GREEN)👁️  预览生产构建...$(RESET)"
	npm run preview

# ── 构建 ──
build: ## 生产环境构建
	@echo "$(GREEN)🔨 生产环境构建...$(RESET)"
	NODE_ENV=production npm run build

build-dev: ## 开发环境构建
	@echo "$(YELLOW)🔨 开发环境构建...$(RESET)"
	NODE_ENV=development npm run build

# ── 代码质量 ──
lint: ## 运行 ESLint 检查
	@echo "$(BLUE)🔍 运行 ESLint...$(RESET)"
	npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings=0

lint-fix: ## 自动修复 ESLint 问题
	@echo "$(BLUE)🔧 自动修复 ESLint 问题...$(RESET)"
	npx eslint . --ext .ts,.tsx,.js,.jsx --fix

format: ## 运行 Prettier 格式化
	@echo "$(BLUE)✨ 格式化代码...$(RESET)"
	npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"

format-check: ## 检查代码格式
	@echo "$(BLUE)🔍 检查代码格式...$(RESET)"
	npx prettier --check "src/**/*.{ts,tsx,js,jsx,json,css,md}"

type-check: ## 运行 TypeScript 类型检查
	@echo "$(BLUE)🔍 运行类型检查...$(RESET)"
	npx tsc --noEmit --pretty

check: lint type-check format-check ## 运行所有检查（lint + type-check + format-check）
	@echo "$(GREEN)✅ 所有检查通过!$(RESET)"

# ── 测试 ──
test: ## 运行所有测试
	@echo "$(BLUE)🧪 运行测试...$(RESET)"
	npm run test -- --run

test-watch: ## 监听模式运行测试
	@echo "$(BLUE)🧪 监听模式运行测试...$(RESET)"
	npm run test

test-coverage: ## 运行测试并生成覆盖率报告
	@echo "$(BLUE)🧪 运行测试并生成覆盖率报告...$(RESET)"
	npm run test -- --run --coverage

# ── 部署 ──
deploy: ## 部署到生产环境
	@echo "$(GREEN)🚀 部署到生产环境...$(RESET)"
	./deploy.sh production

deploy-staging: ## 部署到预发布环境
	@echo "$(YELLOW)🚀 部署到预发布环境...$(RESET)"
	./deploy.sh staging

deploy-dev: ## 部署到开发环境
	@echo "$(BLUE)🚀 部署到开发环境...$(RESET)"
	./deploy.sh dev

# ── 维护 ──
clean: ## 清理构建产物和缓存
	@echo "$(YELLOW)🧹 清理构建产物...$(RESET)"
	rm -rf dist/
	rm -rf .cache/
	rm -rf .eslintcache
	rm -rf *.tsbuildinfo
	@echo "$(GREEN)✅ 清理完成$(RESET)"

clean-all: clean ## 清理所有（包括 node_modules）
	@echo "$(YELLOW)🧹 清理所有（包括 node_modules）...$(RESET)"
	rm -rf node_modules/
	@echo "$(GREEN)✅ 完全清理完成$(RESET)"

update-deps: ## 更新所有依赖到最新版本
	@echo "$(YELLOW)📦 更新依赖...$(RESET)"
	npx npm-check-updates -u
	npm install
	@echo "$(GREEN)✅ 依赖更新完成$(RESET)"

# ── CI 快捷命令 ──
ci: install lint type-check test build ## 完整 CI 流程
	@echo "$(GREEN)✅ CI 流程完成!$(RESET)"
