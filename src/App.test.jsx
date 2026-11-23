import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import hkTesterStore from './store/HKTesterStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  act(() => {
    root.render(
      <Provider store={hkTesterStore}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });

  act(() => {
    root.unmount();
  });
});
