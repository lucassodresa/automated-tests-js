import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import Task from "../src/task";
import { setTimeout } from "node:timers/promises";

describe("Test Task Suite", () => {
  let _logMock;
  let _task;
  beforeEach(() => {
    _logMock = jest.spyOn(console, "log").mockImplementation();

    _task = new Task();
  });

  it.skip("should only run tasks that are due without fake timers (slow)", async () => {
    const tasks = [
      {
        name: "task-will-run-in-5-secs",
        dueAt: new Date(Date.now() + 5_000), // 5 secs
        fn: jest.fn(),
      },
      {
        name: "task-will-run-in-10-secs",
        dueAt: new Date(Date.now() + 10_000), // 10 secs
        fn: jest.fn(),
      },
    ];

    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200);

    await setTimeout(11_000);
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).toHaveBeenCalled();
  }, 15_000);

  it("should only run tasks that are due without fake timers (slow)", async () => {
    jest.useFakeTimers();

    const tasks = [
      {
        name: "task-will-run-in-5-secs",
        dueAt: new Date(Date.now() + 5_000), // 5 secs
        fn: jest.fn(),
      },
      {
        name: "task-will-run-in-10-secs",
        dueAt: new Date(Date.now() + 10_000), // 10 secs
        fn: jest.fn(),
      },
    ];

    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200);

    jest.advanceTimersByTime(4_000);

    expect(tasks.at(0).fn).not.toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2_000);

    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(4_000);

    expect(tasks.at(1).fn).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
