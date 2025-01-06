# 生成 API ts 类型

## 根据接口返回数据生成 TS 类型

### 获取接口返回数据步骤：

1. 登录 [YAPI](https://yapi.yaomaitong.net/) 平台
2. 找到需要生成类型的接口 （ https://yapi.yaomaitong.net/api/interface/get?id= ）
3. 点击"预览"标签页
4. 在右侧找到"返回数据示例"
5. 点击示例数据右上角的"复制"按钮
6. 将复制的 JSON 数据粘贴到下方示例工具中

注意事项：
- 确保返回的示例数据完整且格式正确
- 如果接口返回数据结构较复杂，建议先检查数据示例是否包含所有可能的字段

<demo vue="../../components/utils/generateApitypes.vue" title="基础用法" description="根据 YAPI 生成 API ts 类型"></demo>

