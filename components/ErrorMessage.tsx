import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ApolloError } from '@apollo/client';
import { RedeemUserPasswordResetTokenResult, UserAuthenticationWithPasswordFailure } from '../types/generated-queries';

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

type DisplayErrorProps = {
  error:
    | ApolloError
    | UserAuthenticationWithPasswordFailure
    | RedeemUserPasswordResetTokenResult;
};

function DisplayError({ error }: DisplayErrorProps) {
  if (!error || !error.message) return null;
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Oups!</strong>
        {error.message.replace('Erreur GraphQL: ', '')}
      </p>
    </ErrorStyles>
  )
}

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
