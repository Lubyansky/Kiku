export default{
    data(){
        return{
            
        }
    },
    methods: {
        RegistrationValidation(input){
            var error = null
            if(!input.username){
                error = "Введите имя пользователя"
                return error
            }
            if(input.username.search('^[a-zA-Z0-9]+$')){
                error = "Для имени допускаются только буквы латинского алфавита и цифры"
                return error
            }
            if(input.username.length < 4 || input.username.length > 10 ){
                error = "Имя пользователя должно быть от 4 до 10 символов"
                return error
            }
            if(!input.password){
                error = "Введите пароль"
                return error
            }
            if(input.password.search('^[a-zA-Z0-9]+$')){
                error = "Для пароля допускаются только буквы латинского алфавита и цифры"
                return error
            }
            if(input.password.length < 4 || input.password.length > 10 ){
                error = "Пароль должен быть от 4 до 10 символов"
                return error
            }
            if(!input.repassword){
                error = "Введите повторный пароль"
                return error
            }
            if(input.repassword != input.password){
                error = "Пароли не совпадают"
                return error
            }
            return error
        },
        LoginValidation(input){
            var error = null
            if(!input.username){
                error = "Введите имя пользователя"
                return error
            }
            if(!input.password){
                error = "Введите пароль"
                return error
            }
            return error
        }
    }
}