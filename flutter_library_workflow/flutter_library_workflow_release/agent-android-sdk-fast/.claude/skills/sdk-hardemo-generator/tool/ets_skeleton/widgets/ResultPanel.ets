@Component
export struct ResultPanel {
  @Prop result: string = '';

  build() {
    Column() {
      Text('Result')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 8 })

      Scroll() {
        Text(this.result.trim().length > 0 ? this.result : '无结果')
          .id('txt_result')
          .fontSize(13)
          .fontFamily('monospace')
          .lineHeight(20)
          .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
    }
    .padding({ left: 12, right: 12, top: 4, bottom: 12 })
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}