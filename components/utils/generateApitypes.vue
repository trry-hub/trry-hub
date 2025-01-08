<script setup lang="ts">
import { ref, computed } from 'vue'
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
  try {
    const { req_query = [], req_body_other = '{}', res_body = '{}' } = jsonSchemaStr.value.data || {}
    const hasReqQuery = Array.isArray(req_query) && req_query.length > 0
    const hasReqBody = req_body_other && req_body_other !== '{}'

    // 构建请求类型
    let requestTypes = ''
    if (hasReqQuery && hasReqBody) {
      requestTypes = `request: {
        params: {
          ${generateApiArrayTypes(req_query, 2)}
        },
        body: ${generateApiJsonSchemaTypes(req_body_other, 2)}
      }`
    } else if (hasReqQuery) {
      requestTypes = `request: {
        ${generateApiArrayTypes(req_query, 1)}
      }`
    } else if (hasReqBody) {
      const jsonSchema = JSON.parse(req_body_other) || {}
      requestTypes = `request: ${generateApiJsonSchemaTypes(jsonSchema, 1)}`
    } else {
      requestTypes = 'request: Record<string, never>'
    }

    const jsonSchema = JSON.parse(res_body)?.properties?.data || {}
    const typeDefinition = `interface ${apiTypesName.value.trim() || 'DefaultType'} {
      ${requestTypes}
      response: ${generateApiJsonSchemaTypes(jsonSchema, 1)}
    }`
    return formatTypeDefinition(typeDefinition)
  } catch (error) {
    console.error('生成类型定义时出错:', error)
    return '类型生成失败，请检查输入数据格式'
  }
})

// 修改 generateApiArrayTypes 函数，添加缩进级别参数
const generateApiArrayTypes = (reqArray: any[] = [], indentLevel: number = 1) => {
  try {
    let result = ''
    const indent = '  '.repeat(indentLevel)

    reqArray.forEach((param: any) => {
      if (!param?.name) return

      const required = param.required === "1"
      const name = param.name.trim()
      const type = getParameterType(param.type)
      const desc = param.desc ? `${indent}// ${param.desc.trim()}\n` : ""

      result += `${desc}${indent}${name}${required ? "" : "?"}: ${type};\n`
    })

    return result.trim()
  } catch (error) {
    console.error('生成请求类型时出错:', error)
    return '/* 类型生成失败 */'
  }
}

// 修改 generateApiJsonSchemaTypes 函数，添加缩进级别参数
const generateApiJsonSchemaTypes = (jsonSchema: any, indentLevel: number = 1) => {
  try {
    console.log('jsonSchema: ', jsonSchema)
    const indent = '  '.repeat(indentLevel)
    let result = '{\n'

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
              const desc = typedValue.description ? `${indent}  // ${typedValue.description}\n` : ''
              nestedInterface += `${desc}${indent}    ${key}${typedValue.required ? '' : '?'}: ${getPropertyType(typedValue)}\n`
            }
            nestedInterface += `${indent}  }`
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
        if (!key || !value) continue // 跳过无效属性

        const required = Array.isArray(jsonSchema.required) && jsonSchema.required.includes(key)
        const desc = (value as any).description ? `${indent}  // ${(value as any).description.trim()}\n` : ''
        result += `${desc}${indent}  ${key}${required ? '' : '?'}: ${getPropertyType(value as any)}\n`
      }
    }

    result += '}'
    return result
  } catch (error) {
    console.error('生成响应类型时出错:', error)
    return '{ /* 类型生成失败 */ }'
  }
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

// 新增参数类型判断函数
const getParameterType = (type: string = ''): string => {
  switch (type.toLowerCase()) {
    case 'string':
      return 'string'
    case 'number':
    case 'integer':
      return 'number'
    case 'boolean':
      return 'boolean'
    default:
      return 'any'
  }
}

const handleInput = (e: any) => {
  try {
    const text = e.target.innerText.trim()
    if (!text) return
    jsonSchemaStr.value = JSON.parse(text)
  } catch (error) {
    console.error('JSON 解析失败:', error)
    // 可以添加用户提示
  }
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
