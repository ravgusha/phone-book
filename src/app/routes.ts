import AddContact from '../containers/AddContact';
import Contacts from '../containers/Contacts';
import EditContact from '../containers/EditContact';

const routes = [
  {
    path: '/',
    component: Contacts,
  },
  {
    path: '/add',
    component: AddContact,
  },
  {
    path: '/edit/:id',
    component: EditContact,
  },
];

export default routes;
