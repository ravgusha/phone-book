import Contacts from '../containers/Contacts';
import Form from '../containers/Contacts/Form';

const routes = [
  {
    path: '/contacts',
    component: Contacts,
  },
  {
    path: '/add',
    component: Form,
  },
  {
    path: '/form/:id',
    component: Form,
  },
];

export default routes;
