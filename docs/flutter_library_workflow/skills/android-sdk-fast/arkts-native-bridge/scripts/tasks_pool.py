import os
from multiprocessing import Pool, Manager, cpu_count

def task_execution(target, param, q_out):
    if target:
        ret = target(param)
        if ret:
            q_out.put(ret)
    return

def callback(res):
    pass

def err_callback(errcode):
    print(errcode)

class Tasks:
    """
    description: task pool instance helper to achieve target function
    """
    def __init__(self, target=None, callback_err=err_callback, callback_status=callback):
        self.target = target
        self.q_out = Manager().Queue()
        self.cpus = cpu_count()
        self.process_pool = Pool(processes=self.cpus)
        self.result = []
        self.callback_err = callback_err
        self.callback_status = callback_status

    def dispatch_task(self, param):
        self.process_pool.apply_async(task_execution, (self.target, param, self.q_out),
                                      callback=self.callback_status, error_callback=self.callback_err)

    def wait_tasks_end(self):
        self.process_pool.close()
        self.process_pool.join()

    def get_result(self):
        q_len = self.q_out.qsize()
        for counter in range(q_len):
            self.result.append(self.q_out.get(False))
        return self.result

def test_func(param):
    pid = os.getgid()
    ret = 'Pid {} task param {} doing'.format(pid, param)
    # print(ret)
    return ret

if __name__ == '__main__':
    tasks = Tasks(target=test_func)
    for i in range(10):
        tasks.dispatch_task(i)
    tasks.wait_tasks_end()
    print(tasks.get_result())