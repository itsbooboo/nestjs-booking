import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDocument } from "../models/user.schema";
const getCurrentUserByContext = (context: ExecutionContext):UserDocument => {
    return context.switchToHttp().getRequest().user;
} 
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => getCurrentUserByContext(context),
);