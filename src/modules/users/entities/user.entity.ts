import { UserRole } from "src/common/enums";
import { IUser } from "src/interfaces";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User implements IUser {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text" })
	firstName: string;

	@Column({ type: "text", nullable: true })
	lastName?: string;

	@Column({ type: "varchar", unique: true })
	email: string;

	@Column({ type: "text", nullable: true })
	password?: string;

	@Column({
		type: "text",
		default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s"
	})
	avatarUri?: string;

	@Column({ type: "enum", enum: UserRole, default: UserRole.Client })
	role?: UserRole;

	@Column({ type: "text", default: "local" })
	provider: "local" | "google";

	@Column({ type: "text", nullable: true })
	expertise?: string;

	@Column({ type: "text", nullable: true })
	experience?: string;

	@Column({ type: "text", nullable: true })
	ordersHistory?: string;

	@Column("simple-array", { nullable: true })
	favoritesMasters?: string[];
}
