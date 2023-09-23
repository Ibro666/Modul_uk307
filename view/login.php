<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./view/stylesheet/stylesheet.css">
    <title>Authentifizierung</title>
</head>
<body>
    <div class="body-for-login-p" id="body-for-login-p">
        <div class="forms-container">
        <h1 class="content-title">Anmeldung</h1>
            <form id="login-form">
                <div class="items" id="items">
                 <input type="email" name="user-login" id="user-login" max="400" placeholder="Login">
                </div>
                <div id="messagel"></div>
                <div class="items" id="items">
                 <input type="password" name="password-fild" id="password-fild" min="7" max="600" placeholder="Password">
                </div>
                <div id="messagep"></div>
                <div class="items button" id="items">
                 <button id="submit" type="button">Einlogen</button>
                </div>
             </form>
        </div>
        <div id="errors"></div>    
    </div>

    <script src="./controller/authentication.js"></script>
</body>
</html>