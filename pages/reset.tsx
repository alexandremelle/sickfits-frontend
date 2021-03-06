import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

type ResetPageProps = {
  query: {
    token: string;
  };
};

export default function ResetPage({ query }: ResetPageProps) {
  if (!query?.token) {
    return (
      <div>
        <p>Vous devez faire une demande de rĂ©initialisation</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>RĂ©initialiser votre mot de passe</p>
      <Reset token={query.token} />
    </div>
  );
}
