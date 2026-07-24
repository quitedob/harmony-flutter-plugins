/*
 * Copyright (C) 2025-2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
    ets侧调用接口
*/
/**
 * 动画片段声明
 */
export type AnimationSegment = [number, number];

/**
 * 图像资源替换
 */
export type ImageAssetDeleGate = [string, string];

/**
 * 全局动画播放控制.
 *
 * @param { string } lottieId - 可指定动画播放,不写默认全局播放.
 */
export const lottiePlay: (lottieId?: string) => void;

/**
 * 全局动画暂停控制.
 *
 * @param { string } lottieId - 可指定动画暂停,不写则控制全局动画暂停
 */
export const lottiePause: (lottieId?: string) => void;

/**
 * 全局动画停止控制.
 *
 * @param { string } lottieId - 可指定动画停止,不写则控制全局动画停止
 */
export const lottieStop: (lottieId?: string) => void;

/**
 * 全局动画播放方向控制.
 *
 * @param { number } speed -  值为浮点类型, speed>0正向播放, speed<0反向播放, speed=0暂停播放, speed=1.0/-1.0正常速度播放
 * @param { string } lottieId - 可指定动画停止,不写则控制全局动画的播放方向
 */
export const lottieSetSpeed: (speed: number, lottieId?: string) => void;

/**
 * 全局设置播放方向
 * @param lottieId 被指定的动画名
 * @param direction 1为正向, -1为反向; 当设置为反向时, 从当前播放进度开始回播直到首帧, loop值为true时可无限倒放, speed<0叠加时也是倒放
 */
export const lottieSetDirection: (direction: 1 | -1, lottieId?: string) => void;

/**
 * 全局动画暂停与播放切换.
 *
 * @param { string } lottieId - 可指定动画的暂停与播放切换,不写则控制全局动画的暂停与播放切换
 */
export const lottieTogglePause: (lottieId?: string) => void;

/**
 * 全局动画销毁.
 *
 * @param { string } lottieId - 可指定动画的销毁,不写则控制全局动画的销毁
 */
export const lottieDestroy: (lottieId?: string) => void;

/**
 * 设置所有动画的播放帧率不超过该值，范围1~120。
 * 当动画源帧率高于该值时，该动画的播放帧率会被强制降到该值，否则默认以动画源帧率进行播放，除非另有独立设置；
 * 该设置具备持久性，即不论对于已加载还是新加载的动画都生效。可通过设置0帧率来取消该限制。
 *
 * @param { number } frameRate - 播放帧率
 */
export const lottieSetFrameRate: (frameRate: number) => void;


/** 设置文件缓存大小
 *
 * @param { number } size 缓存文件的个数;
 * @param { number } capacity 缓存文件的总大小;
 */
export const lottieResizeFileCache: (size: number, capacity: number) => void;

/**
 * 全局文件缓存清除.
 *
 * @param { string } url - 具体动画被清除缓存的地址,不写则清除全部的文件缓存
 */
export const lottieClearFileCache: (url?: string) => void;

/** 设置缓存容器大小
 *
 * @param { number } size 缓存容器可以动画个数;
 * @param { number } capacity 缓存容器的总内存大小;
 */
export const lottieResizeCache: (size: number, capacity: number) => void;

/**
 * 清空缓存容器
 *
 */
export const lottieClearCache: () => void;

/**
 * 通过path移除指定缓存
 *
 * @param { string } key - 缓存键值（path）
 */
export const lottieRemoveCache: (path: string) => void;

/**
 * 创建Native的UI组件
 *
 * @param { Object } content - 环境上下文
 * @param { string } lottieId - 动画ID
 * @param { Object } config - 动画配置
 */
export const createNativeRoot: (content: Object, lottieId: string, config: object) => void;

/**
 * 销毁Lottie动画
 *
 * @param { string } lottieId - 动画ID
 */
export const destroy: (lottieId: string) => void;

/**
 * 用于清除产生的所有临时文件
 * @limit 只能在没有lottie组件存在的时候调用,否则调用不生效
 */
export const lottieClearTmpResource: () => void;


/**
 * 设置组件当前是否可见
 * @param { string } lottieId - 动画ID
 * @param { boolean } visible - 是否可见
 */
export const lottieSetVisible: (lottieId: string, visible: boolean) => void;


/**
 * 渲染动画为Bitmap
 * @param { string } lottie - 动画文件，支持资源目录、字符串、网络路径
 * @param { number } frameNum - 帧序号
 * @param { number } width - 宽度
 * @param { number } height - 高度
 * @param { resmgr.ResourceManager } resManager - 当使用资源目录时设置
 */
export const renderToImage: (lottie: string | Resource, frameNum: number, width: number,
  height: number, resManager?: resmgr.ResourceManager) => ArrayBuffer;

/**
 * 动画重载的配置组
 */
interface ConfigType {

  /**
   * ResManager，可选参数，当资源文件跨模块时使用
   *
   */
  resManager?: resmgr.ResourceManager;

  /**
   * 动画Path，支持输入本地路径、本地文件和网络路径
   */
  path?: string | Resource;

  /**
   * 动画json字符串，优先级高于path
   */
  animationData?: string;

  /**
   * 动画播放是否循环，为数值时为循环次数
   */
  loop?: boolean | number;

  /**
   * 动画播放是否自动播放
   */
  autoplay?: boolean;

  /**
   * 初始化动画资源播放时的整体帧范围
   */
  initialSegment?: AnimationSegment;

  /**
   * 动画填充模式
   */
  contentMode?: string;

  /**
   * 图片资源路径
   */
  imagePath?: string;

  /**
   * 动画播放帧率，范围 1-120
   */
  frameRate?: number;

  /**
   * 设置Assets资源替换功能
   */
  setImageAssetDelegate?: ImageAssetDelegate[];
}

/**
 * 文本颜色属性
 */
export interface TextColorConfig {
  /* 红色分量 (0.0 - 1.0) */
  r: number;
  /* 绿色分量 (0.0 - 1.0) */
  g: number;
  /* 蓝色分量 (0.0 - 1.0) */
  b: number;
}

/**
 * 文本图层属性
 */
export interface TextLayerProperties {
  /* 文本内容 */
  text?: string;
  /* 填充颜色 */
  fillColor?: TextColorConfig;
  /* 填充透明度 */
  fillOpacity?: number;
  /* 描边颜色 */
  strokeColor?: TextColorConfig;
  /* 描边透明度 */
  strokeOpacity?: number;
}

/**
 * 完整的图层属性配置（用于 setLayerProperties 方法）
 * 包含文本属性和通用属性
 */
export interface LayerProperties {
  // ========== 文本图层属性 ==========
  textLayerProperties?: TextLayerProperties[];
}

export class LottieController {
  /**
   * 动画ID，唯一标识
   */
  lottieId: string

  /**
   * 是否成功加载
   */
  isLoaded: boolean;

  /**
   * 当前帧号，默认为浮点数，设置非尽可能更新动画帧率时为整数
   */
  currentFrame: number;

  /**
   * 当前帧号，浮点数
   */
  currentRawFrame: number;

  /**
   * 动画播放首帧
   */
  firstFrame: number;

  /**
   * 动画总帧数
   */
  totalFrames: number;

  /**
   * 动画帧率，帧率 frame/s
   */
  frameRate: number;

  /**
   * 动画帧率，帧率 frame/ms
   */
  frameMult: number;

  /**
   * 动画播放速度
   */
  playSpeed: number;

  /**
   * 动画播放方向
   */
  playDirection: number;

  /**
   * 动画完成播放的次数
   */
  playCount: number;

  /**
   * 动画播放是否暂停
   */
  isPaused: boolean;

  /**
   * 动画播放是否自动播放
   */
  autoplay: boolean;

  /**
   * 动画播放是否循环，为数值时为循环次数
   */
  loop: boolean | number;

  /**
   * 当前动画片段完成单次播放的帧数
   */
  timeCompleted: number = 0;

  /**
   * 当前动画片段序号
   */
  segmentPos: number = 0;

  /**
   * 是否尽可能更新动画帧率
   */
  isSubframeEnabled: boolean;

  /**
   * 当前动画播放片段
   */
  segments: AnimationSegment | AnimationSegment[];

  /**
   * 动画播放
   */
  play: () => void;

  /**
   * 动画停止
   */
  stop: () => void;

  /**
   * 动画暂停播放切换
   */
  togglePause: () => void;

  /**
   * 动画销毁
   */
  destroy: () => void;

  /**
   * 动画暂停
   */
  pause: () => void;

  /**
   * 控制动画画面停止在某一帧或某个时刻
   * @param value 帧号(值>=0)或时刻(ms)
   * @param isFrame true按帧控制, false按时间控制, 缺省默认false
   */
  goToAndStop: (value: number, isFrame?: boolean) => void;

  /**
   * 控制动画画面从在某一帧或某个时刻开始播放
   * @param value 帧号(>=0)或时刻(ms)
   * @param isFrame true按帧控制, false按时间控制, 缺省默认false
   */
  goToAndPlay: (value: number, isFrame?: boolean) => void;

  /**
   * 限定动画资源播放时的整体帧范围
   * @param init 起始帧号
   * @param end 结束帧号
   */
  setSegment: (init: number, end: number) => void;

  /**
   * 设置仅播放指定范围的帧动画
   * @param segments 片段或片段数组; 若传入的是数组, 且当前loop!=0, 播放结束后, 仅循环播放最后一个片段
   * @param forceFlag 值为true立刻生效, 值为false循环下次播放的时候生效
   */
  playSegments: (segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean) => void;

  /**
   * 重置动画播放片段, 使动画重新从第一帧开始播放完整动画
   * @param forceFlag 值为true立刻生效, 值为false循环下次播放的时候生效
   */
  resetSegments: (forceFlag: boolean) => void;

  /**
   * 设置播放速度
   * @param speed 值为浮点类型, speed>0正向播放, speed<0反向播放, speed=0暂停播放, speed=1.0/-1.0正常速度播放
   */
  setSpeed: (speed: number) => void;

  /**
   * 设置播放方向
   * @param direction 1为正向, -1为反向
   */
  setDirection: (direction: number) => void;

  /**
   * 设置尽可能的更新动画帧率
   * @param useSubFrames true为使用子帧, false为不使用子帧
   */
  setSubframe: (useSubFrames: boolean) => boolean;

  /**
   * 获取动画播放时间
   * @param inFrames 为true时获取帧数，值为false时获取时间(单位ms)，默认为false
   */
  getDuration: (inFrames?: boolean) => number;

  /**
   * 强制触发指定事件
   * @param name 事件名称 'enterFrame' | 'loopComplete' | 'complete' | 'segmentStart' | 'destroy' | 'config_ready' | 'data_ready' | 'DOMLoaded' | 'error' | 'data_failed' | 'loaded_images'
   */
  triggerEvent: (name: string) => void;

  /**
   * 添加监听事件
   * @param name 事件名称
   * @param callback 事件回调函数
   */
  addEventListener: (name: string, callback: Function) => void;

  /**
   * 移除监听事件
   * @param name 事件名称
   * @param callback 移除后触发的事件回调函数
   */
  removeEventListener: (name: string, callback?: Function) => void;

  /**
   * 改变动画某个图层的颜色，当前支持st和fl图层
   * @param layer 图层名称
   * @param startColor 起始颜色，若endColor不传，则startColor为要修改的颜色，支持RGB和RGBA格式
   * @param endColor 结束颜色，支持RGB和RGBA格式
   */
  changeColor: (layer: string, startColor: number[], endColor?: number[]) => void;

  /**
   * 设置布局模式
   * @param contentMode 布局模式，Fill,Cover,Top,Bottom,Contain,AdaptiveWidth,AdaptiveHeight，默认为 Contain
   */
  setContentMode: (contentMode: string) => void;

  /**
   * 设置动画帧率
   * @param frameRate 动画帧率，范围1~120
   */
  setFrameRate: (frameRate: number) => void;

  /**
   * 设置动画重载
   * @param config 动画配置
   */
  reload: (config: ConfigType) => void;

  /**
   * 图层属性设置接口
   * @param layerName 图层名称
   * @param properties 图层属性配置对象
   * @returns 结果码: 0-成功, 1-参数错误, 2-动画未加载, 3-属性解析失败, 4-图层未找到
   */
  setLayerProperties: (layerName: string, properties: LayerProperties) => number;
}



