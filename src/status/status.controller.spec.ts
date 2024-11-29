import { Test, TestingModule } from '@nestjs/testing';
import { StatutController } from './status.controller';
import { StatusService } from './status.service';
import { CreateStatutDto } from './status.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('StatutController', () => {
    let controller: StatutController;
    let service: StatusService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StatutController],
            providers: [
                {
                    provide: StatusService,
                    useValue: {
                        createStatus: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<StatutController>(StatutController);
        service = module.get<StatusService>(StatusService);
    });

    describe('createStatus', () => {
        it('should throw BadRequestException if nom is missing', async () => {
            const createStatutDto: CreateStatutDto = { nom: '', projectId: 1 };

            await expect(controller.createStatus(createStatutDto)).rejects.toThrow(BadRequestException);
        });


        it('should call statusService.createStatus with correct parameters', async () => {
            const createStatutDto: CreateStatutDto = { nom: 'Test Status', projectId: 1 };
            const result = { id: 1, nom: 'Test Status' } as any;
            jest.spyOn(service, 'createStatus').mockResolvedValue(result);

            expect(await controller.createStatus(createStatutDto)).toBe(result);
            expect(service.createStatus).toHaveBeenCalledWith(createStatutDto);
        });

        it('should throw BadRequestException if statusService.createStatus throws BadRequestException', async () => {
            const createStatutDto: CreateStatutDto = { nom: 'Test Status', projectId: 1 };
            jest.spyOn(service, 'createStatus').mockRejectedValue(new BadRequestException());

            await expect(controller.createStatus(createStatutDto)).rejects.toThrow(BadRequestException);
        });

        it('should throw ConflictException if statusService.createStatus throws ConflictException', async () => {
            const createStatutDto: CreateStatutDto = { nom: 'Test Status', projectId: 1 };
            jest.spyOn(service, 'createStatus').mockRejectedValue(new ConflictException());

            await expect(controller.createStatus(createStatutDto)).rejects.toThrow(ConflictException);
        });

    });
});