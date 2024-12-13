const regex = /^[a-zA-Z]+$/;

export const isEnglishString = (str: string) =>  regex.test(str)
