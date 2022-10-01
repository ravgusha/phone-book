import Authorization from '../containers/Authorization';
import Contacts from '../containers/Contacts';
import Form from '../containers/Contacts/ContactForm';

const routes = [
  {
    path: '/login',
    component: Authorization,
  },
  {
    path: '/signup',
    component: Authorization,
  },
  {
    path: '/contacts',
    component: Contacts,
  },
  {
    path: 'contacts/add',
    component: Form,
  },
  {
    path: 'contacts/form/:id',
    component: Form,
  },
];

export default routes;
