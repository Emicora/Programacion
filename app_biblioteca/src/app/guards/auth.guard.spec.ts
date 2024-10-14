import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CanActivateFn } from '@angular/router';

describe('authsessionGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

  beforeEach(() => {
    // Crear un espía de Router
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should redirect to home if token is not present', () => {
    // Simular que no hay token en localStorage
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    const result = executeGuard({} as any, {} as any);
    
    // Verificar que redirige a 'home'
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('home');
    // Verificar que el guard retorna false
    expect(result).toBeFalse();
  });

  it('should allow access if token is present', () => {
    // Simular que hay un token en localStorage
    spyOn(localStorage, 'getItem').and.returnValue('mock-token');
    
    const result = executeGuard({} as any, {} as any);
    
    // Verificar que no se llama a navigateByUrl
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
    // Verificar que el guard retorna true
    expect(result).toBeTrue();
  });
});
