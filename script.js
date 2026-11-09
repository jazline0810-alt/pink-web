const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Kunin ang input values
    const nameInput = document.getElementById("name").value.trim();
    const emailInput = document.querySelector("input[type='email']").value.trim();

    if (nameInput && emailInput) {
      // I-save ang account details sa storage para magamit sa log-in
      localStorage.setItem("registered_email", emailInput.toLowerCase());
      localStorage.setItem("registered_name", nameInput);
      
      // Active session keys para sa pagpasok sa hub
      localStorage.setItem("user", nameInput);
      localStorage.setItem("grindmind_user", nameInput);

      // Diretsong lumipat sa courses.html nang walang alert pop-up
      window.location.href = "courses.html";
    }
  });
}
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    
    // Magpapalit ng icon (lalagyan ng slash kapag nakabukas ang password)
    this.classList.toggle("fa-eye-slash");
  });
}
const toggleLoginPassword = document.getElementById("toggleLoginPassword");
const loginPasswordInput = document.getElementById("loginPassword");

if (toggleLoginPassword && loginPasswordInput) {
  toggleLoginPassword.addEventListener("click", function () {
    const type = loginPasswordInput.getAttribute("type") === "password" ? "text" : "password";
    loginPasswordInput.setAttribute("type", type);
    
    // Magpapalit ang icon ng mata (magkakaroon ng slash kapag bukas)
    this.classList.toggle("fa-eye-slash");
  });
}
document.addEventListener("DOMContentLoaded", function () {
  // Kunin ang nakatagong data mula sa localStorage na sinave natin sa Sign-Up / Log-In
  const savedEmail = localStorage.getItem("registered_email");
  const savedPassword = localStorage.getItem("registered_password");

  // Hanapin ang mga element sa My-account.html
  const emailElement = document.getElementById("displayEmail");
  const passwordElement = document.getElementById("displayPassword");

  // Kung may nahanap na email, ipalit ito sa screen
  if (savedEmail && emailElement) {
    emailElement.textContent = savedEmail;
  }

  // Kung may nahanap na password, gawin itong dots (••••) base sa haba ng totoong password
  if (savedPassword && passwordElement) {
    passwordElement.textContent = "•".repeat(savedPassword.length);
  }
})


// Toggle para sa Password Eye sa Account Settings
document.addEventListener("DOMContentLoaded", function () {
    const toggleAccountPassword = document.getElementById("toggleAccountPassword");
    const displayPasswordElement = document.getElementById("displayPassword");

    let isAccountPasswordVisible = false;

    if (toggleAccountPassword && displayPasswordElement) {
        toggleAccountPassword.addEventListener("click", function () {
            const actualPassword = localStorage.getItem("registered_password") || "Walang Password na Naka-save";




            if (!isAccountPasswordVisible) {
                displayPasswordElement.textContent = actualPassword;
                // Palitan ang 'this' ng 'toggleAccountPassword' dito:
                toggleAccountPassword.classList.remove("fa-eye");
                toggleAccountPassword.classList.add("fa-eye-slash");
                isAccountPasswordVisible = true;
            } else {
                displayPasswordElement.textContent = "•".repeat(actualPassword.length);
                // At pati rin dito:
                toggleAccountPassword.classList.remove("fa-eye-slash");
                toggleAccountPassword.classList.add("fa-eye");
                isAccountPasswordVisible = false;
            }
        });
    }
});
// Sign Up Logic
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm"); // Palitan ang ID kung iba ang gamit mo

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Iwasan ang pag-refresh ng page agad

            const emailInput = document.getElementById("signupEmail").value;
            const passwordInput = document.getElementById("signupPassword").value;

            if (emailInput && passwordInput) {
                // I-save sa localStorage gamit ang eksaktong key na babasahin sa Account Settings
                localStorage.setItem("registered_email", emailInput);
                localStorage.setItem("registered_password", passwordInput);

                alert("Account created successfully!");
                window.location.href = "log-in.html"; // I-redirect sa login page
            } else {
                alert("Please fill in all fields.");
            }
        });
    }
});
// Log In Logic
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm"); // Palitan ang ID kung iba ang gamit mo

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailInput = document.getElementById("loginEmail").value;
            const passwordInput = document.getElementById("loginPassword").value;

            if (emailInput && passwordInput) {
                // I-update ang naka-store na email at password
                localStorage.setItem("registered_email", emailInput);
                localStorage.setItem("registered_password", passwordInput);

                alert("Log in successful!");
                window.location.href = "My-account.html"; // I-redirect sa account settings
            } else {
                alert("Please enter your email and password.");
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------------
    // 1. SIGN-UP HANDLER (Nagse-save ng Password sa localStorage)
    // -----------------------------------------------------------
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailInput = document.querySelector('input[type="email"]');
            const passwordInput = document.getElementById("password");

            if (emailInput && passwordInput) {
                // I-save ang email at password
                localStorage.setItem("registered_email", emailInput.value);
                localStorage.setItem("registered_password", passwordInput.value);

                
                window.location.href = "courses.html"; // I-redirect sa Login page
            }
        });
    }

    // -----------------------------------------------------------
    // 2. LOG-IN HANDLER (Nag-a-update din ng Password sa localStorage)
    // -----------------------------------------------------------
    const loginForm = document.querySelector('form[action="#"]');
    if (loginForm && !signupForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const passwordInput = document.getElementById("loginPassword");
            const userInput = document.querySelector("input[type='text']");

            if (passwordInput && passwordInput.value) {
                localStorage.setItem("registered_password", passwordInput.value);
            }
            if (userInput && userInput.value) {
                localStorage.setItem("registered_email", userInput.value);
            }

            window.location.href = "courses.html";
        });
    }

    // -----------------------------------------------------------
    // 3. ACCOUNT SETTINGS TOGGLE (Nagbabasa ng Naka-save na Password)
    // -----------------------------------------------------------
    const toggleAccountPassword = document.getElementById("toggleAccountPassword");
    const displayPasswordElement = document.getElementById("displayPassword");

    let isAccountPasswordVisible = false;

    if (toggleAccountPassword && displayPasswordElement) {
        toggleAccountPassword.addEventListener("click", function () {
            // Kunin ang password mula sa storage
            const actualPassword = localStorage.getItem("registered_password") || "Walang Password na Naka-save";

            if (!isAccountPasswordVisible) {
                displayPasswordElement.textContent = actualPassword;
                toggleAccountPassword.classList.remove("fa-eye");
                toggleAccountPassword.classList.add("fa-eye-slash");
                isAccountPasswordVisible = true;
            } else {
                displayPasswordElement.textContent = "•".repeat(actualPassword.length);
                toggleAccountPassword.classList.remove("fa-eye-slash");
                toggleAccountPassword.classList.add("fa-eye");
                isAccountPasswordVisible = false;
            }
        });
    }
});