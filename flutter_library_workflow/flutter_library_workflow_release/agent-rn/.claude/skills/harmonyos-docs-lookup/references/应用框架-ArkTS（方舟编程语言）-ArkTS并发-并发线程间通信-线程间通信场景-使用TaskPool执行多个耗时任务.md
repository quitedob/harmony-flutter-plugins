多个任务同时执行时，由于任务复杂度不同，执行时间和返回数据的时间也会不同。如果宿主线程需要所有任务执行完毕的数据，可以通过[TaskGroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-taskpool#taskgroup10)的方式实现。

除了以上情况，如果需要处理的数据量较大，例如一个列表中有10000条数据，将这些数据放在一个Task中处理会非常耗时。那么就可以将原始数据拆分成多个子列表，为每个子列表分配一个独立的Task执行，等待全部Task执行完成后合并结果形成完整的数据，这样可以节省处理时间，提升用户体验。

下面以多个任务进行图片加载为例进行说明。

1. 实现子线程中需要执行的任务。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export class IconItemSource {
   2. image: string | Resource = '';
   3. text: string | Resource = '';

   5. constructor(image: string | Resource = '', text: string | Resource = '') {
   6. this.image = image;
   7. this.text = text;
   8. }
   9. }
   ```

   [IconItemSource.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationScenario/entry/src/main/ets/managers/IconItemSource.ets#L16-L26)

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { IconItemSource } from './IconItemSource';

   3. // 在Task中执行的方法，需要添加@Concurrent注解，否则无法正常调用。
   4. @Concurrent
   5. export function loadPicture(count: number): IconItemSource[] {
   6. let iconItemSourceList: IconItemSource[] = [];
   7. // 遍历添加6*count个IconItem的数据
   8. for (let index = 0; index < count; index++) {
   9. const numStart: number = index * 6;
   10. // 此处循环使用6张图片资源
   11. iconItemSourceList.push(new IconItemSource('$media:startIcon', `item${numStart + 1}`));
   12. iconItemSourceList.push(new IconItemSource('$media:background', `item${numStart + 2}`));
   13. iconItemSourceList.push(new IconItemSource('$media:foreground', `item${numStart + 3}`));
   14. iconItemSourceList.push(new IconItemSource('$media:startIcon', `item${numStart + 4}`));
   15. iconItemSourceList.push(new IconItemSource('$media:background', `item${numStart + 5}`));
   16. iconItemSourceList.push(new IconItemSource('$media:foreground', `item${numStart + 6}`));
   17. }
   18. return iconItemSourceList;
   19. }
   ```

   [IndependentTask.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationScenario/entry/src/main/ets/managers/IndependentTask.ets#L16-L36)
2. 将需要执行的Task放到一个TaskGroup里面，当TaskGroup中的所有Task执行完毕后，会将所有Task的结果都放在一个数组中并返回给宿主线程，而不是每执行完一个Task就返回一次，这样宿主线程就可以在返回的数据里拿到所有Task的执行结果，便于后续使用。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { taskpool } from '@kit.ArkTS';
   2. import { IconItemSource } from './IconItemSource';
   3. import { loadPicture } from './IndependentTask';

   5. let iconItemSourceList: IconItemSource[] = [];

   7. let taskGroup: taskpool.TaskGroup = new taskpool.TaskGroup();
   8. taskGroup.addTask(new taskpool.Task(loadPicture, 30));
   9. taskGroup.addTask(new taskpool.Task(loadPicture, 20));
   10. taskGroup.addTask(new taskpool.Task(loadPicture, 10));
   11. taskpool.execute(taskGroup).then((ret: object) => {
   12. let tmpLength = (ret as IconItemSource[][]).length
   13. for (let i = 0; i < tmpLength; i++) {
   14. for (let j = 0; j < ret[i].length; j++) {
   15. if (ret[i][j]) {
   16. iconItemSourceList.push(ret[i][j]);
   17. }
   18. }
   19. }
   20. // The length of iconItemSourceList is 360
   21. console.info('The length of iconItemSourceList is ' + (iconItemSourceList?.length ?? 0));
   22. })
   ```

   [MultiTask.ets](https://gitcode.com/HarmonyOS_Samples/guide-snippets/blob/master/ArkTS/ArkTsConcurrent/ConcurrentThreadCommunication/InterThreadCommunicationScenario/entry/src/main/ets/managers/MultiTask.ets#L16-L39)