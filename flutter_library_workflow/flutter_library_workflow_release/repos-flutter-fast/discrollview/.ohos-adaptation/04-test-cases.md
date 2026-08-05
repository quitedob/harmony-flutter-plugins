# Discrollview 黑盒测试用例

**生成日期**: 2026-07-30
**项目名称**: discrollview 鸿蒙化适配
**测试套件**: discrollview-test-suite
**测试用例总数**: 31

---

## 文档信息

| 项目 | 内容 |
|------|------|
| 插件名称 | discrollview |
| 版本 | 0.0.2 |
| 测试范围 | 8 个功能模块，31 个测试用例 |
| 测试设备 | phone / tablet / 2in1 |
| 测试类型 | 黑盒功能测试 |

## 测试用例级别分布

| 级别 | 数量 | 占比 |
|------|------|------|
| L0 | 14 | 45.2% |
| L1 | 11 | 35.5% |
| L2 | 6 | 19.4% |
| **合计** | **31** | **100%** |

---

## 模块一览

| 模块编号 | 模块名称 | 优先级 | 用例数 |
|----------|----------|--------|--------|
| F-01 | DiscrollveWidget 根滚动容器 | P0 | 4 |
| F-02 | DiscrollveContent 内容布局 | P0 | 2 |
| F-03 | DiscrollveConfig 变换配置 | P0 | 6 |
| F-04 | DiscrollveDirection 方向枚举 | P1 | 7 |
| F-05 | 滚动比例计算引擎 | P0 | 4 |
| F-06 | 变换渲染器 | P0 | 2 |
| F-07 | 阈值控制 | P1 | 4 |
| F-08 | 重置/恢复 | P0 | 2 |

---

## F-01 DiscrollveWidget 根滚动容器 (P0)

### F-01-01
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-01-01 | DiscrollveWidget 页面正常构建并展示静态头部与首个动画卡片 | L0 | phone/tablet/2in1 | 设备: HarmonyOS phone/tablet/2in1, API≥19；应用: discrollview 演示 Demo 已安装启动；屏幕: 竖屏, 亮度默认；网络: 离线可用；权限: 无需特殊权限 | 1. 打开 Discrollview 演示应用并进入 DiscrollveWidget 演示页 → 页面成功进入 Discrollview 演示应用；AppBar 标题为 'Discrollview Demo'，Key('dv_appbar') 可见；2. 观察页面顶部静态头部区域 Key('dv_header_static') → 深蓝渐变背景可见；Key('dv_label_title') 文字为 'Discrollview Demo'；Key('dv_label_subtitle') 文字为 'Scroll down to see discrollve effects'；3. 检查静态头部下方是否可见第一个动画卡片 Key('dv_card_alpha_bottom') → 静态头部完全占据 viewport，第一个动画卡片不可见（隐藏在屏幕底部以下） | 页面完整渲染：AppBar 正常 → 静态头部正常 → 动画卡片等待向下滚动触发。无白屏、无渲染异常、无布局溢出 | 页面停留于顶部滚动位置（scrollOffset=0）。所有动画卡片处于 onResetDiscrollve 初始状态 |

### F-01-02
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-01-02 | 静态头部 Key('dv_header_static') 占据完整 viewport 高度 | L0 | phone/tablet/2in1 | 同 F-01-01；页面位于顶部（scrollOffset=0） | 1. 测量静态头部 Key('dv_header_static') 的渲染高度 → 头部高度 = 设备可视区高度（允许 ±2px 误差）。头部底部边缘与屏幕底部边缘对齐；2. 检查 Key('dv_card_alpha_bottom') 的屏幕位置 → 卡片顶部坐标 ≥ viewport 底部坐标（即卡片完全位于可视区以下） | 静态头部精确占据 viewport 全高。后续内容需要通过向下滚动手势才能看到。第一个动画卡片的顶部在屏幕底部以下 | 同 F-01-01 |

### F-01-03
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-01-03 | 程序化滚动通过 ScrollController 驱动变换效果更新 | L1 | phone/tablet/2in1 | 同 F-01-01；应用代码持有对外部传入 ScrollController 的引用 | 1. 通过代码执行 controller.animateTo(scrollExtent * 0.3, duration: 300ms) → 页面平滑滚动到 30% 位置；过程中 Key('dv_card_alpha_bottom') 开始出现淡入+上移效果；2. 等待动画完成(300ms)后检查 controller.offset → controller.offset 精确等于目标值（允许 ±2px 误差） | ScrollController 正常工作：animateTo 精确到达目标位置，中间帧触发子 Widget 变换更新。controller.hasClients 始终为 true | 滚动停止在 30% 位置。卡片变换处于对应的中间态 |

### F-01-04
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-01-04 | DiscrollveWidget 构造时子 Widget 少于 2 个触发 AssertionError | L2 | phone/tablet/2in1 | 编写单元测试；在 debug 模式下执行（assert 启用） | 1. 执行代码 DiscrollveWidget(children: []) → 构造阶段参数校验拒绝非法构造：抛出 AssertionError（错误消息包含 'at least 2 children'），符合预期；2. 执行代码 DiscrollveWidget(children: [singleChild]) → 同上：参数校验拒绝非法构造，抛出 AssertionError（错误消息包含 'at least 2 children'），符合预期 | 两种无效构造均在 debug 模式下触发参数校验：抛出 AssertionError 拒绝非法构造，符合预期。不会渲染异常状态的 Widget 树 | 异常被正常捕获，不影响测试框架或其他测试用例执行 |

---

## F-02 DiscrollveContent 内容布局 (P0)

### F-02-01
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-02-01 | DiscrollveContent.child() 工厂方法正确绑定 config 与 child | L0 | phone/tablet/2in1 | 编写单元测试；debug 模式 | 1. 调用 DiscrollveContent.child(config: DiscrollveConfig(alpha: true, threshold: 0.3), child: SizedBox(key: Key('test_child'))) → 返回的 Widget 非 null；.config.alpha == true；.config.threshold == 0.3；.child.key == Key('test_child') | config 和 child 引用完整保留，无属性丢失或默认值覆盖 | 无 |

### F-02-02
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-02-02 | config.none 子 Widget Key('dv_footer_static') 在滚动全过程中无任何视觉变化 | L0 | phone/tablet/2in1 | 设备: HarmonyOS phone/tablet/2in1；进入 Discrollview 演示应用 Demo 页面 | 1. 定位底部静态文本 Key('dv_footer_static')，记录其初始屏幕位置和透明度 → Key('dv_label_reset_hint') 文字 'Scroll back up to reset — all transforms reverse' 完全可见；2. 从顶部向下连续滚动至页面底部 → 滚动全程中 Key('dv_footer_static') 始终完全可见：无透明度变化、无位置跳动、无缩放变形、无背景色变化；3. 从底部向上连续回滚至顶部 → 回滚全程中 Key('dv_footer_static') 保持稳定，无闪烁 | config.none 子 Widget 在正向滚动和反向回滚中均完全不受 Discrollve 变换系统影响，始终以原始状态渲染 | 页面回到顶部，同 F-01-01 |

---

## F-03 DiscrollveConfig 变换配置 (P0)

### F-03-01
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-03-01 | 卡片 Key('dv_card_alpha_bottom') 的 alpha 透明度从 0.0 平滑过渡到 1.0 | L0 | phone/tablet/2in1 | HarmonyOS 设备；进入 Discrollview 演示应用 Demo 页面；页面位于顶部；该卡片 config: alpha=true, fromBottom, threshold=0.2 | 1. 在 scrollOffset=0 时检查卡片 Key('dv_card_alpha_bottom') → 卡片基于 alpha 变换处于不可见状态——其渲染树中存在 Opacity(opacity: 0.0) 包裹；2. 缓慢向下滚动（约 100px/秒），观察卡片 → 卡片逐渐变得可见：透明度平滑增加，无跳变。因 threshold=0.2，前 20% 触发区间内无变化，20% 后开始淡入；3. 继续滚动直到卡片完全进入触发区域完成 → 卡片 opacity 达到 1.0，文字 'Alpha + fromBottom (threshold 0.2)' 完全清晰可读 | 卡片透明度按 withThreshold 逻辑从 0.0 平滑过渡至 1.0。threshold=0.2 延迟生效正确：前 20% 无变化，后 80% 完成过渡 | 卡片保持 opacity=1.0，完全可见 |

### F-03-02
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-03-02 | 卡片 Key('dv_card_scale_xy') 的 scaleX 从 0 平滑展开到 1 | L0 | phone/tablet/2in1 | HarmonyOS 设备；进入 Demo 页面；该卡片 config: scaleX=true, scaleY=true | 1. 在卡片未触发前观察其渲染宽度 → 卡片 scaleX=0.0（水平方向不可见）；2. 向下滚动至卡片中心到达视口中心附近 → 卡片水平宽度逐渐从 0 展开至完整宽度（margin horizontal=24 保留）；3. 卡片完全触发后检查 → 卡片水平方向完全展开（scaleX=1.0），宽度 = viewportWidth - 48px（两侧 margin 各 24px） | 卡片水平缩放平滑完成：0.0 → 1.0，中间帧无跳变。scaleX 和 scaleY 同时启用时等比例缩放 | 卡片保持 scaleX=1.0 |

### F-03-03
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-03-03 | 卡片 Key('dv_card_scale_xy') 的 scaleY 从 0 平滑展开到 1 | L1 | phone/tablet/2in1 | 同 F-03-02 | 1. 未触发时检查卡片渲染高度 → 卡片 scaleY=0.0（垂直方向不可见）；2. 向下滚动触发变换 → 卡片垂直高度与水平宽度同步增加，宽高比保持不变 | scaleY 与 scaleX 同步展开，保持原始宽高比，无变形 | 卡片保持 scaleY=1.0 |

### F-03-04
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-03-04 | scaleX 和 scaleY 同时启用时保持等比例缩放 | L1 | phone/tablet/2in1 | 同 F-03-02；使用工具或视觉比较缩放过程中的宽高比 | 1. 在卡片缩放过程中（ratio ≈ 0.5）测量其渲染宽度和高度 → 宽度/高度 的比值 = (300-24*2) / 180 = 252/180 = 1.4（与原始卡片宽高比一致）。此时的 scaleX = scaleY = 0.5；2. 完全触发后（ratio=1.0）再次测量 → 宽度/高度 = 252/180 = 1.4，scaleX=scaleY=1.0 | 缩放全程 scaleX == scaleY，卡片始终保持原始宽高比（1.4:1），无压扁或拉伸变形 | 卡片保持等比例缩放终态 |

### F-03-05
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-03-05 | 卡片 Key('dv_card_bgcolor') 背景色从 #88EE66 渐变至 #000000 | L1 | phone/tablet/2in1 | HarmonyOS 设备；进入 Demo 页面；该卡片 config: fromColor=0xFF88EE66, toColor=0xFF000000, alpha=true | 1. 卡片未触发时检查其背景色 → 卡片背景色为 fromColor：RGB(136, 238, 102) = 亮绿色 #88EE66；2. 缓慢向下滚动触发变换 → 背景色从亮绿色逐步变暗。中间帧（ratio≈0.5）时背景色约为 Color.lerp(from, to, 0.5) = RGB(68, 119, 51) = 暗绿色；3. 卡片完全触发后 → 背景色精确为 toColor：RGB(0, 0, 0) = 纯黑色 #000000。同时卡片因 alpha=true 而可见 | 背景色沿 Color.lerp 线性插值路径从 #88EE66 平滑过渡至 #000000，每个中间帧颜色与数学计算一致（允许 ±1 色值误差） | 卡片背景色保持 #000000（纯黑） |

### F-03-06
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-03-06 | DiscrollveConfig() 默认构造函数所有变换属性为关闭状态 | L2 | phone/tablet/2in1 | 单元测试环境 | 1. 执行 const DiscrollveConfig(); 并逐属性断言 → 断言全部默认关闭值：alpha=false; scaleX=false; scaleY=false; translation=-1; fromColor=-1; toColor=-1; threshold=0.0; hasTransforms==false | 全部 7 个属性为默认关闭值。hasTransforms getter 返回 false | 无 |

---

## F-04 DiscrollveDirection 方向枚举 (P1)

### F-04-01
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-04-01 | 卡片 Key('dv_card_alpha_bottom') 从屏幕下方 (fromBottom) 移入原位 | L0 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；卡片 config: translation=fromBottom(0x02), alpha=true, threshold=0.2 | 1. 卡片未触发时检查其垂直位置 → 卡片 translateY = +卡片高度（即位于自身高度下方的偏移位置，对于 h=200: translateY≈+200px）；2. 向下滚动至 threshold 之后 → 卡片从下方逐渐向上移动。translateY 从 +200 逐步减小（符合 withThreshold 重映射）；3. 卡片完全触发（ratio=1.0）后检查 → translateY = 0（精确到达原位，允许 ±2px 误差）。卡片与周围的 margin 对齐正常 | 卡片从屏幕下方沿 Y 轴正方向移入原位，移动轨迹为纯垂直向上。配合 alpha 同时淡入，视觉效果流畅 | 卡片 translateY=0，固定于正常布局位置 |

### F-04-02
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-04-02 | 卡片 Key('dv_card_alpha_top') 从屏幕上方 (fromTop) 移入原位 | L1 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；卡片 config: translation=fromTop(0x01), alpha=true | 1. 卡片未触发时 → 卡片 translateY = -卡片高度（位于上方偏移，h=200: translateY≈-200px）；2. 向下滚动触发变换 → 卡片从上方逐渐向下移动，translateY 从 -200 → 0 | 卡片从屏幕上方沿 Y 轴负方向移入原位，与 fromBottom 方向相反 | 卡片 translateY=0 |

### F-04-03
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-04-03 | 卡片 Key('dv_card_alpha_left') 从屏幕左方 (fromLeft) 移入原位 | L1 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；卡片 config: translation=fromLeft(0x04), alpha=true, threshold=0.3 | 1. 卡片未触发时 → 卡片 translateX = -卡片宽度（位于左方偏移，w≈viewportW-48: translateX≈-(viewportW-48)px）；2. 向下滚动至超过 threshold 0.3 → 卡片从左方逐渐向右移动。前 30% 触发区间无变化，之后开始移动 | 卡片从屏幕左方沿 X 轴正方向移入原位，配合 alpha 淡入和 threshold=0.3 延迟 | 卡片 translateX=0 |

### F-04-04
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-04-04 | 卡片 Key('dv_card_alpha_right') 从屏幕右方 (fromRight) 移入原位 | L1 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；卡片 config: translation=fromRight(0x08), alpha=true, threshold=0.4 | 1. 卡片未触发时 → 卡片 translateX = +卡片宽度（位于右方偏移）；2. 向下滚动至超过 threshold 0.4 → 卡片从右方逐渐向左移动。前 40% 触发区间无变化，之后开始移动 | 卡片从屏幕右方沿 X 轴负方向移入原位。与 fromLeft 方向相反 | 卡片 translateX=0 |

### F-04-05
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-04-05 | 卡片 Key('dv_card_all_combined') 从对角线方向 (fromBottom\|fromLeft) 移入 | L0 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；卡片 config: translation=fromBottom\|fromLeft(0x02\|0x04=0x06), alpha+scaleX+scaleY, threshold=0.2 | 1. 卡片未触发时检查位置 → 卡片同时存在 translateY=+220 和 translateX=-(vw-48) 的偏移——位于视口右下对角方向；2. 向下滚动触发变换 → 卡片沿对角线方向（右下→左上）移入：translateY 和 translateX 同时减小。因阈值 0.2，前 20% 无变化 | 卡片沿对角线方向平滑移入原位。translateY 和 translateX 同步归零，配合 alpha 淡入+scale 放大，四种变换协调统一 | 卡片 translateX=0, translateY=0, scale=1.0, opacity=1.0 |

### F-04-06
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-04-06 | 构造 DiscrollveConfig(translation: fromTop\|fromBottom) 触发 AssertionError | L2 | phone/tablet/2in1 | 单元测试；debug 模式 | 1. 执行 const DiscrollveConfig(translation: 0x01\|0x02) → 构造阶段参数校验拒绝该对立组合：编译时或构造时触发 AssertionError（错误消息包含 'fromTop+fromBottom and fromLeft+fromRight are forbidden'），符合预期 | fromTop+fromBottom 对立组合在构造阶段被参数校验拒绝：抛出 AssertionError，不产生有效的 DiscrollveConfig 实例，符合预期 | 异常正常传播，不产生无效状态 |

### F-04-07
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-04-07 | 构造 DiscrollveConfig(translation: fromLeft\|fromRight) 触发 AssertionError | L2 | phone/tablet/2in1 | 单元测试；debug 模式 | 1. 执行 const DiscrollveConfig(translation: 0x04\|0x08) → 构造阶段参数校验拒绝该对立组合：编译时或构造时触发 AssertionError（错误消息同 F-04-06），符合预期 | fromLeft+fromRight 对立组合在构造阶段被参数校验拒绝：抛出 AssertionError，与 fromTop+fromBottom 组合被等效拒绝，符合预期 | 异常正常传播 |

---

## F-05 滚动比例计算引擎 (P0)

### F-05-01
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-05-01 | 中心触发模式——剩余空间充足时卡片中心到达视口中心触发 | L0 | phone/tablet/2in1 | 单元测试；参数: viewportHeight=400, childHeight=200, totalHeight=1000, childBottom=300 | 1. 调用 calculateRatio(absoluteTop=100, ...) → 满足 center-reach 条件（remaining≥childH+halfViewport）。absoluteTop(100) ≤ halfViewport(200)。ratio = (200-100)/200 = 0.5；2. 调用 calculateRatio(absoluteTop=0, ...) → ratio = (200-0)/200 = 1.0（完全触发）；3. 调用 calculateRatio(absoluteTop=300, ...) → 返回 null（未触发——卡片中心尚未到达视口中心） | ratio 在 absoluteTop 从 halfViewport→0 时从 0.0→1.0 线性变化。超出触发范围返回 null（重置信号） | 无 |

### F-05-02
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-05-02 | 顶部触发模式——剩余空间不足时卡片顶部到达视口底部触发 | L1 | phone/tablet/2in1 | 单元测试；参数: viewportHeight=400, childHeight=200, totalHeight=550, childBottom=500 | 1. 调用 calculateRatio(absoluteTop=300, ...) → 满足 top-reach 条件（remaining<childH+halfViewport）。absoluteTop(300) ≤ viewportHeight(400)。ratio = (400-300)/200 = 0.5；2. 调用 calculateRatio(absoluteTop=0, ...) → ratio = clamp(400/200, 0, 1) = 1.0（卡片顶部到达视口底部，完全触发）；3. 调用 calculateRatio(absoluteTop=500, ...) → 返回 null（未触发——卡片顶部尚未到达视口底部） | 剩余空间不足时自动切换为 top-reach 模式。ratio 变化范围和 clamp 行为与 center-reach 一致 | 无 |

### F-05-03
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-05-03 | clampRatio 在所有输入下将 ratio 限制在 [0.0, 1.0] | L0 | phone/tablet/2in1 | 单元测试 | 1. 调用 clampRatio(-0.5, 0.0, 1.0) 验证负值被裁剪为 0.0 → 返回 0.0；2. 调用 clampRatio(0.0, 0.0, 1.0) 验证下边界 0.0 保持不变 → 返回 0.0；3. 调用 clampRatio(0.5, 0.0, 1.0) 验证区间内值原样返回 → 返回 0.5；4. 调用 clampRatio(1.0, 0.0, 1.0) 验证上边界 1.0 保持不变 → 返回 1.0；5. 调用 clampRatio(1.5, 0.0, 1.0) 验证超过上界的值被裁剪为 1.0 → 返回 1.0 | 所有 5 个测试点精确通过。ratio 永远不会超出 [0.0, 1.0] 区间 | 无 |

### F-05-04
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-05-04 | childHeight=0 时 calculateRatio 返回 null 而不抛出异常 | L2 | phone/tablet/2in1 | 单元测试 | 1. 调用 calculateRatio(childHeight: 0, absoluteTop: 0, childBottom: 0, viewportHeight: 400, totalHeight: 800) → 参数校验不接受零高度子 Widget 参与计算：返回 null（静默跳过），无异常抛出，无除零错误，符合预期 | 参数校验不接受零高度子 Widget 参与变换计算：calculateRatio 返回 null 静默跳过，不触发异常，符合预期 | 无 |

---

## F-06 变换渲染器 (P0)

### F-06-01
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-06-01 | 全组合卡片 Key('dv_card_all_combined') 四种变换同时生效且协调 | L0 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；该卡片 config: alpha+scaleX+scaleY+fromBottom\|fromLeft, threshold=0.2, h=220 | 1. 卡片未触发时（ratio<0.2）检查 → 卡片不可见（opacity=0.0）+ 尺寸为零（scale=0.0）+ 位置偏移（translateY≈+220, translateX≈-(vw-48)）。四种效果同时处于初始态；2. 向下滚动至 ratio≈0.6（阈值后映射 ratio≈0.5） → 卡片约 50% 可见（opacity≈0.5）+ 约半尺寸（scale≈0.5）+ 偏移约减半（translateY≈+110, translateX≈-(vw-48)/2)。四种效果协调推进；3. 向下滚动至 ratio=1.0（完全触发） → 卡片完全可见（opacity=1.0）+ 完整尺寸（scale=1.0）+ 到达原位（translateX=0, translateY=0）。四种效果同时达到终态 | 四种变换在阈值过滤后同步协调推进。任一时刻各变换视觉进度一致（所有效果均基于同一个 ratio 值驱动） | 卡片处于完全触发终态：opacity=1, scale=1, translate=0, color 仅涉及此卡片除外 |

### F-06-02
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-06-02 | ratio=1.0 时所有已启用变换均精确达到设计终态 | L1 | phone/tablet/2in1 | HarmonyOS 设备；滚动至任意卡片完全触发位置（ratio=1.0） | 1. 对卡片 Key('dv_card_alpha_bottom')（alpha+fromBottom,th=0.2）检查 → 断言 alpha 卡片终态：opacity==1.0, translateY==0；2. 对卡片 Key('dv_card_scale_xy')（scaleX+scaleY）检查 → 断言 scale 卡片终态：scaleX==1.0, scaleY==1.0；3. 对卡片 Key('dv_card_bgcolor')（fromColor+toColor+alpha）检查 → 断言背景色卡片终态：background-color==toColor(#000000), opacity==1.0 | 每一张已完全触发的卡片，其所有启用的变换属性均达到终态值（opacity=1.0, scale=1.0, translate=0, color=toColor）。不因 threshold 值而偏离终态 | 各卡片保持终态直到用户回滚 |

---

## F-07 阈值控制 (P1)

### F-07-01
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-07-01 | threshold=0（默认）变换在 ratio 刚 >0 时立即触发 | L0 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；卡片 Key('dv_card_scale_xy') 的 threshold=默认 0.0，无延迟配置 | 1. 缓慢向下滚动，观察卡片在刚进入触发区域时的行为 → 卡片在 ratio 刚开始 >0（绝对位置刚 ≤ halfViewport）的第一时间即出现缩放效果。无任何延迟区间 | withThreshold(ratio, 0.0) 直接返回原 ratio。变换在触发条件满足的瞬间立即开始，与不设置 threshold 行为完全等价 | 卡片继续随滚动完成变换 |

### F-07-02
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-07-02 | threshold=0.2(Key dv_card_alpha_bottom) 与 threshold=0.4(Key dv_card_alpha_right) 延迟对比验证 | L0 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；两卡片分别配置 threshold=0.2 和 0.4，均为 alpha 变换 | 1. 向下滚动，观察两张卡片的触发顺序 → threshold=0.2 的卡片先开始变换；threshold=0.4 的卡片后开始变换。两者触发时机相差约 0.2 的 ratio 区间；2. 分别检查两卡片在完全触发后的状态 → 两卡片均在 ratio=1.0 时达到 opacity=1.0。threshold 值不同不影响终态 | threshold 值正确控制每张卡片的独立触发延迟。withThreshold((1.0-0.2)/(1-0.2), 0.2) 和 withThreshold((1.0-0.4)/(1-0.4), 0.4) 均在 ratio=1.0 时返回 1.0 | 两卡片均达到终态，opacity=1.0 |

### F-07-03
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-07-03 | withThreshold(1.0, anyThreshold) 始终精确返回 1.0 | L1 | phone/tablet/2in1 | 单元测试 | 1. withThreshold(1.0, 0.0) → 期望 1.0 → 返回 1.0；2. withThreshold(1.0, 0.3) → 期望 (1.0-0.3)/(1.0-0.3) = 1.0 → 返回 1.0；3. withThreshold(1.0, 0.5) → 期望 1.0 → 返回 1.0；4. withThreshold(1.0, 0.9) → 期望 1.0 → 返回 1.0 | 不论 threshold 取何值（0.0~0.9），withThreshold(1.0, t) 始终精确返回 1.0。这是终态一致性的数学保证 | 无 |

### F-07-04
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-07-04 | const DiscrollveConfig(threshold: 越界值) 在编译时或构造时被拒绝 | L2 | phone/tablet/2in1 | 单元测试；debug 模式 | 1. 执行 const DiscrollveConfig(threshold: -0.1) 验证下界越界被参数校验拒绝 → 构造阶段参数校验拒绝越界值：编译时或构造时触发 AssertionError（消息为 'threshold must be in range [0.0, 1.0]'），符合预期；2. 执行 const DiscrollveConfig(threshold: 1.1) 验证上界越界被参数校验拒绝 → 同上：threshold 上界越界同样在构造阶段被参数校验拒绝，抛出 AssertionError，符合预期 | threshold ∈ [0.0, 1.0] 的约束在构造阶段被参数校验强制执行：越界值抛出 AssertionError 被拒绝，不会进入运行时，符合预期 | 异常正常传播 |

---

## F-08 重置/恢复 (P0)

### F-08-01
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-08-01 | 向上回滚时已触发卡片的变换效果平滑反向播放至初始状态 | L0 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；页面已向下滚动至至少一张动画卡片完全触发（ratio=1.0）的位置 | 1. 以约 100px/秒 的速度缓慢向上回滚 → 之前完全触发的卡片随回滚逐渐反向变换：opacity 从 1→0 降低；scale 从 1→0 缩小；translate 从 0→初始偏移。变化为正向滚动的逆过程；2. 继续回滚直到卡片完全离开触发区域（ratio 变为 null） → 卡片完全恢复到初始状态——与刚进入页面时的状态相同：opacity=0（如启用 alpha）、scale=0（如启用 scale）、translate 为初始偏移值 | 回滚过程平滑对称：卡片从终态连续过渡回初始态。无突然跳变、无闪烁、无卡顿 | 卡片回到 onResetDiscrollve 初始状态，与 F-01-01 的初始状态一致 |

### F-08-02
| Case ID | 标题 | 级别 | 设备 | 前置条件 | 测试步骤 | 预期结果 | 后置条件 |
|---------|------|------|------|----------|----------|----------|----------|
| F-08-02 | config.none 子 Widget Key('dv_footer_static') 在正向/反向滚动中持续稳定 | L1 | phone/tablet/2in1 | HarmonyOS 设备；Demo 页面；底部静态文本 config: none | 1. 从顶部向下完整滚动到底部 → Key('dv_footer_static') 和 Key('dv_label_reset_hint') 全程持续可见：无透明度变化、无位移动画、无缩放、无着色变化；2. 从底部向上完整回滚到顶部 → 同上——静态元素在回滚中同样完全不受影响 | config.none 子 Widget 在滚动系统的全生命周期（正向+反向）中渲染结果恒定不变。其行为等价于普通 ListView 子 Widget | 页面回到顶部，静态文本保持不变 |

---

## 覆盖统计

| 模块 | API | 用例数 | L0 | L1 | L2 |
|------|-----|--------|----|----|-----|
| F-01 DiscrollveWidget | DiscrollveWidget | 4 | 2 | 1 | 1 |
| F-02 DiscrollveContent | DiscrollveContent.child() | 2 | 2 | 0 | 0 |
| F-03 DiscrollveConfig | DiscrollveConfig | 6 | 2 | 3 | 1 |
| F-04 DiscrollveDirection | DiscrollveDirection | 7 | 2 | 3 | 2 |
| F-05 比例计算 | calculateRatio | 4 | 2 | 1 | 1 |
| F-06 变换渲染 | _applyTransforms | 2 | 1 | 1 | 0 |
| F-07 阈值控制 | withThreshold | 4 | 2 | 1 | 1 |
| F-08 重置恢复 | _resetTransforms | 2 | 1 | 1 | 0 |
| **合计** | | **31** | **14** | **11** | **6** |

---

*本测试用例由 flutter-fast 工作流生成 · 2026-07-30*
