export const checkValidData = (email, password, name) => {


    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

    const isNameValid = /^[0-9A-Za-z]{6,16}$/.test(name);




    if (!isNameValid) {
        return "Name must be between 6 to 16 characters and can only contain letters and numbers.";
    }

    if (!isEmailValid) {
        return "Please enter a valid email address";
    }
    if (!isPasswordValid) {
        return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return null;

}