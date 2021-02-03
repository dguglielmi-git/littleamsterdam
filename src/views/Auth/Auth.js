import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import "./Auth.scss";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container fluid className="auth">
      <div className="container-form">
        {showLogin ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="change-form">
        <p>
          {showLogin ? (
            <React.Fragment>
              No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Entra con tu cuenta
              <span onClick={() => setShowLogin(!showLogin)}>
                Iniciar Sesion
              </span>
            </React.Fragment>
          )}
        </p>
      </div>
    </Container>
  );
}
