import { 
  IsString, 
  IsEmail, 
  Matches, 
  MinLength, 
  IsEnum, 
  IsNumber, 
  IsPositive 
} from 'class-validator';
import { Transform } from 'class-transformer'; // ✅ Importación necesaria
import { DocumentType, Disease } from "src/users/users.entity";

export class SignupDto {
  @IsString()
  fullname: string;

  @IsEnum(DocumentType, { message: "Invalid document type" })
  documentType: DocumentType;

  @IsString()
  document: string;

  @IsEmail({}, { message: "Invalid email format" }) 
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
      message: "Email must contain '@' and a valid domain",
  })
  @Transform(({ value }) => value.toLowerCase()) // ✅ Convierte email a minúsculas
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/^(?=.*[0-9])/, { message: "Password must contain at least one number" })
  password: string;

  @IsNumber()
  @IsPositive({ message: "Height must be a positive number" })
  height: number;

  @IsNumber()
  @IsPositive({ message: "Weight must be a positive number" })
  weight: number; 

  @IsEnum(Disease, { message: "Invalid disease type" })
  disease?: Disease;
}
