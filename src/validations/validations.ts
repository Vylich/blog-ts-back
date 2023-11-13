import { body } from "express-validator";

export const registerValidator = [
  body('email', 'Неверная почта').isEmail(),
  body('password', 'Пароль минимум из 6 символов').isLength({min: 6}),
  body('fullName', 'Укажите имя').isLength({min: 2}),
  body('avatarUrl', 'Невернsq формат').optional().isString(),
];

export const loginValidator = [
  body('email', 'Неверная почта').isEmail(),
  body('password', 'Пароль минимум из 6 символов').isLength({min: 6}),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
  body('text', 'Введите текст статьи').isLength({min: 5}).isString(),
  body('tags', 'Неверный формат тегов (укажите массив)').optional().isString(),
  body('imageUrl', 'Неверная ссылка на картинку').optional().isString(),
];