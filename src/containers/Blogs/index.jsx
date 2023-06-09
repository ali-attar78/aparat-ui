import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <p>The current URL path is: {pathname}</p>
    </div>
  );
}

export default MyComponent;