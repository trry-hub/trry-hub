<script setup lang="ts">
import resJson from './api-res.json'

interface JsonSchemaProperty {
  type?: string;
  description?: string;
  required?: boolean;
  items?: JsonSchemaProperty;
  properties?: Record<string, JsonSchemaProperty>;
}

const jsonSchemaStr = ref(resJson)
const apiTypesName = ref('Demo')


const jsonSchemaObj = computed(() => {
  const { req_query, res_body } = jsonSchemaStr.value.data
  const typeDefinition = `interface ${apiTypesName.value} {
    ${generateApiReqTypes(req_query)}
    ${generateApiResTypes(res_body)}
  }`
  return formatTypeDefinition(typeDefinition)
})

// 生成 API 请求类型
const generateApiReqTypes = (reqArray: any[]) => {
  let result = `request {\n`

  // 处理每个参数
  reqArray.forEach((param: any) => {
    const required = param.required === "1"
    const name = param.name
    const type = "string"
    const desc = param.desc ? `  // ${param.desc}\n` : ""

    result += `${desc}  ${name}${required ? "" : "?"}: ${type};\n`
  })

  result += "}"
  return result
}

// 生成 API 响应类型
const generateApiResTypes = (jsonSchemaStr: string) => {
  let jsonSchema = JSON.parse(jsonSchemaStr).properties.data
  let result = `response {\n`

  // 获取属性的类型
  const getPropertyType = (prop: any): string => {
    if (!prop.type) return 'any'

    switch (prop.type) {
      case 'string':
        return 'string'
      case 'number':
      case 'integer':
        return 'number'
      case 'boolean':
        return 'boolean'
      case 'array':
        if (prop.items) {
          return `${getPropertyType(prop.items)}[]`
        }
        return 'any[]'
      case 'object':
        if (prop.properties) {
          let nestedInterface = '{\n'
          for (const [key, value] of Object.entries(prop.properties)) {
            const typedValue = value as JsonSchemaProperty
            const desc = typedValue.description ? `  // ${typedValue.description}\n` : ''
            nestedInterface += `${desc}    ${key}${typedValue.required ? '' : '?'}: ${getPropertyType(typedValue)};\n`
          }
          nestedInterface += '  }'
          return nestedInterface
        }
        return 'Record<string, any>'
      default:
        return 'any'
    }
  }

  // 处理属性
  if (jsonSchema.properties) {
    for (const [key, value] of Object.entries(jsonSchema.properties)) {
      const required = jsonSchema.required?.includes(key)
      // 添加属性描述作为注释
      const desc = (value as any).description ? `  // ${(value as any).description}\n` : ''
      result += `${desc}  ${key}${required ? '' : '?'}: ${getPropertyType(value as any)};\n`
    }
  }

  result += '}'

  return result
}

const formatTypeDefinition = (typeStr: string): string => {
  let indentLevel = 0
  const lines = typeStr.split('\n')

  return lines
    .map(line => {
      // 处理缩进
      if (line.includes('}')) indentLevel--
      const formatted = line.trim() ? '  '.repeat(indentLevel) + line.trim() : ''
      if (line.includes('{')) indentLevel++
      return formatted
    })
    .filter(Boolean) // 移除空行
    .join('\n')
}
const handleInput = (e: any) => {
  jsonSchemaStr.value = JSON.parse(e.target.innerText)
}
</script>

<template>
  <div class="type-definition-container">
    YAPI 接口返回数据（接口返回值粘贴到下方）：
    <pre contenteditable @input="handleInput" class="pre json-input" :rows="10"
         placeholder="请输入 JSON 字符串">{{ JSON.stringify(jsonSchemaStr, null, 2) }}</pre>

    转换后TS类型：

    <pre class="type-definition pre" contenteditable>{{ jsonSchemaObj }}</pre>
  </div>
</template>

<style lang="scss" scoped>
.type-definition-container {
  position: relative;

  .pre {
    height: 300px;
    border-radius: 4px;
    padding: 16px;
    background: #f5f7fa;
    overflow: auto;
    max-height: fit-content; // 最大高度为内容高度
    resize: vertical; // 添加垂直方向的拖拽缩放
  }

  .type-definition {
    margin-top: 16px;
    position: relative;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-all;
    color: #2c3e50;

    .copy-button {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 1;
    }
  }
}
</style>
