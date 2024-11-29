import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';

describe('TaskController', () => {
    let taskController: TaskController;
    let taskService: TaskService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TaskController],
            providers: [
                {
                    provide: TaskService,
                    useValue: {
                        // mock implementation of TaskService methods if needed
                    },
                },
            ],
        })
        .overrideGuard(AuthGuard('jwt'))
        .useValue({})
        .compile();

        taskController = module.get<TaskController>(TaskController);
        taskService = module.get<TaskService>(TaskService);
    });

    it('should be defined', () => {
        expect(taskController).toBeDefined();
    });

    it('should have taskService defined', () => {
        expect(taskController['taskService']).toBeDefined();
        expect(taskController['taskService']).toBe(taskService);
    });
});