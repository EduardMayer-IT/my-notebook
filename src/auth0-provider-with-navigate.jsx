import { Auth0Provider } from "@auth0/auth0-react";
import PropTypes from "prop-types";

export const Auth0ProviderWithNavigate = ({ children }) => {
    const domain = "filtastisch-test-01.eu.auth0.com";
    const clientId = "9ZPKoItPOi4HTpIGe3lZtDKabgCJtgkF";
    const redirectUri = "http://localhost:5173";

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            cacheLocation="memory"
            onRedirect={redirectUri}
        >
            {children}
        </Auth0Provider>
    );
};

Auth0ProviderWithNavigate.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Auth0ProviderWithNavigate;