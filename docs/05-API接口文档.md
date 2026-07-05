# DTx-GI API 接口文档

> **文档编号**：05  
> **版本**：V1.0

---

## 认证方式

使用 JWT Token 认证。在请求头中携带：

```
Authorization: Bearer <token>
```

---

## 接口列表

### 患者管理

#### 获取患者列表

```
GET /api/v1/patients
```

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码，默认1 |
| pageSize | int | 否 | 每页数量，默认10 |
| keyword | string | 否 | 搜索关键词 |

**响应**：

```json
{
  "code": 200,
  "data": {
    "list": [...],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

#### 创建患者

```
POST /api/v1/patients
```

**请求体**：

```json
{
  "name": "张三",
  "age": 58,
  "gender": "男",
  "diagnosis": "胃癌",
  "treatmentPlan": "手术+化疗"
}
```

#### 获取患者详情

```
GET /api/v1/patients/:id
```

### 研究项目

#### 获取项目列表

```
GET /api/v1/projects
```

#### 创建项目

```
POST /api/v1/projects
```

### AI 模型

#### 获取模型列表

```
GET /api/v1/ai-models
```

### 伦理审查

#### 获取审查列表

```
GET /api/v1/ethics
```

---

## 错误码

| 码 | 说明 |
|----|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

> **维护说明**：由技术负责人维护
