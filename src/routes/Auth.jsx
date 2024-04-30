import {Auth0Provider} from "@auth0/auth0-react";

const Auth = () => {
    return(
        <Auth0Provider
            domain="filtastisch-test-01.eu.auth0.com"
            clientId="9ZPKoItPOi4HTpIGe3lZtDKabgCJtgkF"
            auth0Provider={{
                redirect_uri: window.location.origin
            }}
        />
    )
}

export default Auth