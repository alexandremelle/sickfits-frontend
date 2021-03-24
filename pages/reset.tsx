import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

type ResetPageProps = {
  query: {
    token: string;
  };
};

export default function ResetPage({ query }: ResetPageProps): JSX.Element {
  if (!query?.token) {
    return (
      <div>
        <p>Vous devez faire une demande de réinitialisation</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Réinitialiser votre mot de passe</p>
      <Reset token={query.token} />
    </div>
  );
}