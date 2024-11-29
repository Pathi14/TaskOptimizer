import { Test, TestingModule } from '@nestjs/testing';
import { ProjetController } from './project.controller';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { Prisma, Projet } from '@prisma/client';

describe('ProjetController', () => {
    let controller: ProjetController;
    let service: ProjectService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProjetController],
            providers: [
                {
                    provide: ProjectService,
                    useValue: {
                        addProject: jest.fn(),
                        getProjects: jest.fn(),
                        updateProject: jest.fn(),
                        deleteProject: jest.fn(),
                        getProjectbyId: jest.fn(),
                        addUsersToProject: jest.fn(),
                        removeUserFromProject: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProjetController>(ProjetController);
        service = module.get<ProjectService>(ProjectService);
    });

    describe('createProject', () => {
        it('should throw BadRequestException if titre is missing', async () => {
            const dto: CreateProjectDto = { titre: '', description: '' };
            await expect(controller.createProject(dto)).rejects.toThrow(BadRequestException);
        });

        it('should call projectService.addProject with correct parameters', async () => {
            const dto: CreateProjectDto = { titre: 'Test Project', description: 'Test Description' };
            await controller.createProject(dto);
            expect(service.addProject).toHaveBeenCalledWith(dto);
        });

        it('should throw BadRequestException on service error', async () => {
            const dto: CreateProjectDto = { titre: 'Test Project', description: 'Test Description' };
            jest.spyOn(service, 'addProject').mockImplementation(() => {
                throw new BadRequestException();
            });
            await expect(controller.createProject(dto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('getProjects', () => {
        it('should return an array of projects', async () => {
            const result: Projet[] = [{ id: 1, titre: 'Test Project', description: 'Test Description' }];
            jest.spyOn(service, 'getProjects').mockResolvedValue(result);
            expect(await controller.getProjects()).toBe(result);
        });
    });

    describe('updateProject', () => {
        it('should throw BadRequestException if body is missing', async () => {
            await expect(controller.updateProject(1, null)).rejects.toThrow(BadRequestException);
        });

        it('should call projectService.updateProject with correct parameters', async () => {
            const body: Prisma.ProjetUpdateInput = { titre: 'Updated Project' };
            await controller.updateProject(1, body);
            expect(service.updateProject).toHaveBeenCalledWith(1, body);
        });

        it('should throw BadRequestException on service error', async () => {
            const body: Prisma.ProjetUpdateInput = { titre: 'Updated Project' };
            jest.spyOn(service, 'updateProject').mockImplementation(() => {
                throw new BadRequestException();
            });
            await expect(controller.updateProject(1, body)).rejects.toThrow(BadRequestException);
        });
    });

    describe('deleteProject', () => {
        it('should throw BadRequestException if id is missing', async () => {
            await expect(controller.deleteProject(null)).rejects.toThrow(BadRequestException);
        });

        it('should call projectService.deleteProject with correct parameters', async () => {
            await controller.deleteProject(1);
            expect(service.deleteProject).toHaveBeenCalledWith(1);
        });

        it('should return success message on successful deletion', async () => {
            jest.spyOn(service, 'deleteProject').mockResolvedValue();
            expect(await controller.deleteProject(1)).toEqual({ message: 'Task with ID 1 has been deleted successfully.' });
        });
    });

    describe('getProjectbyId', () => {
        it('should return a project by id', async () => {
            const result: Projet = { id: 1, titre: 'Test Project', description: 'Test Description' };
            jest.spyOn(service, 'getProjectbyId').mockResolvedValue(result);
            expect(await controller.getProjectbyId(1)).toBe(result);
        });
    });

    describe('addUsersToProjet', () => {
        it('should throw BadRequestException if idProject is missing', async () => {
            await expect(controller.addUsersToProjet(null, { usersIds: [1, 2] })).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if body is missing', async () => {
            await expect(controller.addUsersToProjet(1, null)).rejects.toThrow(BadRequestException);
        });

        it('should call projectService.addUsersToProject with correct parameters', async () => {
            const body = { usersIds: [1, 2] };
            await controller.addUsersToProjet(1, body);
            expect(service.addUsersToProject).toHaveBeenCalledWith(1, body.usersIds);
        });
    });

    describe('removeUserFromProjet', () => {
        it('should throw BadRequestException if idProject or idUser is missing', async () => {
            await expect(controller.removeUserFromProjet(null, 1)).rejects.toThrow(BadRequestException);
            await expect(controller.removeUserFromProjet(1, null)).rejects.toThrow(BadRequestException);
        });

        it('should call projectService.removeUserFromProject with correct parameters', async () => {
            await controller.removeUserFromProjet(1, 2);
            expect(service.removeUserFromProject).toHaveBeenCalledWith(1, 2);
        });
    });
});