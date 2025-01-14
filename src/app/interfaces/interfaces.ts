export interface User {
    name: string,
    lastname: string,
    birthdate: string,
    email: string,
    password: string,
    preferences?: Preferences,
    profile?: Profile,
    tasks?: Task[],
    _id: string
}

export interface Preferences {
    reminder: boolean,
    reminderFrequency: string,
    dateFormat: string,
    timeFormat: string,
    taskPriority: string,
    uiMode: string,
    weekBegins: string,
}

interface Profile {
    avatar: string,
    bio: string,
    ocupation: string
}

export interface Task {
    taskName: string,
    taskDescription: string,
    deadLine: string,
    startTime: string,
    endTime: string,
    priority: string,
    status: string,
    tags: [],
    guests: [],
    _id: string
}

export interface UserScheme {
    user: User
}

export interface TaskScheme {
    task: Task
}

export interface LoginScheme {
    email: string,
    password: string,
    token: string,
    id: string
}