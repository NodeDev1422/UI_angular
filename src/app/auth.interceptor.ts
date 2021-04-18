import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthServiceService } from "./Admin/services/auth-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthServiceService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();
        req = req.clone({
            setHeaders: {
                authentication: `Bearer ${accessToken}` 
            }
        });
        return next.handle(req);
    }
}