import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth.dto';

describe('AuthController', () => {
    let authController: AuthController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        createUser: jest.fn(),
                        authenticateUser: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        userService = module.get<UserService>(UserService);
    });

    describe('signUp', () => {
        it('should return an access token and user info', async () => {
            const authDto: AuthDto = { nom: 'Test User', adresse_mail: 'test@example.com', mot_de_passe: 'password' };
            const result = { accessToken: 'token', user: { id: 1, nom: 'Test User' } };

            jest.spyOn(userService, 'createUser').mockResolvedValue(result);

            expect(await authController.signUp(authDto)).toBe(result);
            expect(userService.createUser).toHaveBeenCalledWith(authDto);
        });
    });

    describe('login', () => {
        it('should return an access token and user info', async () => {
            const authDto: AuthDto = { nom: 'Test User', adresse_mail: 'test@example.com', mot_de_passe: 'password' };
            const result = { accessToken: 'token', user: { id: 1, nom: 'Test User' } };

            jest.spyOn(userService, 'authenticateUser').mockResolvedValue(result);

            expect(await authController.login(authDto)).toBe(result);
            expect(userService.authenticateUser).toHaveBeenCalledWith(authDto);
        });
    });
});