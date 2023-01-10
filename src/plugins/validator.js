import {Form as VeeForm,
     Field as VeeField, 
     configure,
     defineRule,
     ErrorMessage
    } from 'vee-validate';

import{
      email,
      required,
      min,
      max,
      min_value,
      max_value,
      alpha_spaces,
      confirmed,
      image,
      ext
}from '@vee-validate/rules' 



export default{
    install(app){

        app.component("VeeField", VeeField)
        app.component("VeeForm",VeeForm)
        app.component('ErrorMessage',ErrorMessage)
        defineRule('required',required)
        defineRule('email',email)
        defineRule('min',min)
        defineRule('max',max)
        defineRule('min_value',min_value)
        defineRule('max_value',max_value)
        defineRule('alpha_spaces',alpha_spaces)
        defineRule('confirmed',confirmed)
        defineRule('image',image)
        defineRule('ext',ext)
        
        
        configure({
            generateMessage: (ctx) => {
                const messages = {

                    required:`The field ${ctx.field} is required`,
                    min:`The field ${ctx.field} is too short`,
                    max:`The field ${ctx.field} is too long`,
                    alpha_spaces:`the field ${ctx.field} may only contain alphabetic characters and spaces`,
                    email:`The field ${ctx.field} must be a valid email`,
                    min_value:`the field ${ctx.field} is too low`,
                    max_value:`the field ${ctx.field} is too high`,
                    confirmed:`the password does not match`, 
                    image:`the file must be an image `,
                    ext:`the image must be jpg,png `
                }

                const message = messages[ctx.rule.name] ?
                                messages[ctx.rule.name] :
                                `the field ${ctx.field} is invalid`
                return message;
                
            },
            validateOnChange:true,
            validateOnInput:true,
            validateOnModelUpdate:true,
        })
    }
}