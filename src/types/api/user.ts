import { Link, SeoulDistrict, UserType, Wrapper } from "../common"
import { ShopWrapper } from "./application";

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {  // 회원가입 Request body
  email: string
  password: string
  type: UserType
}

export interface User {
  id: string
  email: string
  type: UserType
  name?: string
  phone?: string
  address?: string
  bio?: string
}

export interface UserDetail extends User {
  shop?: ShopWrapper | null
}

export interface UpdateUserProfileRequest {   // 내 정보 수정 Request body
  name: string
  phone: string
  address: SeoulDistrict
  bio: string
}

export type UserWrapper = { 
  item: User
  href: string
};

export type SignupResponse = Wrapper<Pick<User, 'id' | 'email' | 'type'>>  // 회원가입 Responses

// TypeScript의 유틸리티 타입 중 하나인 Pick
// User 타입에서 특정 속성만 "뽑아오는 것" ( ?: 와 Pick ) 이 둘은 목적이 전혀 다르다!


export interface LoginResponse {  // 로그인 Responses
  item: {
    token: string
    user: UserWrapper
  }
  links: Link[];
}

export type GetUserResponse = Wrapper<UserDetail>  // 내 정보 조회, 내 정보 수정 Responses