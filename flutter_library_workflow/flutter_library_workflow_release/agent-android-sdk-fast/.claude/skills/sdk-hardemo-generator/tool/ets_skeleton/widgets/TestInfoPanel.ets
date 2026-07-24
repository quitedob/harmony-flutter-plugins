@Component
export struct TestInfoPanel {
  @Prop level: string = '';
  @Prop preconditions: string = '';
  // test_steps is passed as a string[] (one entry per step) so the panel does
  // not need to parse/split a joined string (which collides on `;`/`\n` inside
  // action text). The generator emits a pre-split array.
  @Prop test_steps: string[] = [];
  @Prop expected_result: string = '';
  @Prop postconditions: string = '';

  build() {
    Column() {
      Text('测试信息')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 8 })

      Column() {
        Row() {
          Text('优先级: ')
            .fontSize(14)
            .fontColor('#333333')
          Text(this.level)
            .fontSize(14)
            .fontColor('#666666')
        }
        .width('100%')
        .margin({ bottom: 6 })

        Column() {
          Text('前置条件:')
            .fontSize(14)
            .fontColor('#333333')
            .margin({ bottom: 2 })
          Text(this.preconditions || '无')
            .fontSize(14)
            .fontColor('#666666')
            .width('100%')
        }
        .width('100%')
        .margin({ bottom: 6 })

        Column() {
          Text('测试步骤:')
            .fontSize(14)
            .fontColor('#333333')
            .margin({ bottom: 4 })

          ForEach(this.test_steps, (step: string, index: number) => {
            Text(step)
              .fontSize(13)
              .fontColor('#666666')
              .margin({ bottom: 4 })
              .width('100%')
          }, (step: string, index: number) => index.toString())
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .margin({ bottom: 6 })

        Column() {
          Text('预期结果:')
            .fontSize(14)
            .fontColor('#333333')
            .margin({ bottom: 2 })
          Text(this.expected_result || '无')
            .fontSize(14)
            .fontColor('#666666')
            .width('100%')
            .wordBreak(WordBreak.BREAK_ALL)
        }
        .width('100%')
        .margin({ bottom: 6 })

        Column() {
          Text('后置条件:')
            .fontSize(14)
            .fontColor('#333333')
            .margin({ bottom: 2 })
          Text(this.postconditions || '无')
            .fontSize(14)
            .fontColor('#666666')
            .width('100%')
        }
        .width('100%')
      }
      .alignItems(HorizontalAlign.Start)
      .padding(12)
      .backgroundColor('#FFFFFF')
      .borderRadius(8)
      .width('100%')
    }
    .padding({ left: 12, right: 12, top: 12 })
    .width('100%')
  }
}
