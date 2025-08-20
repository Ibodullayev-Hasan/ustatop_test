import { UserRole } from "src/common/enums"

export interface IUser {
	id: string
	firstName: string
	lastName: string
	email: string
	role?: UserRole
	password: string
	avatarUri?: string
	expertise?: string,
	experience?: string
	ordersHistory?: string
	favoritesMasters?: string[]
}