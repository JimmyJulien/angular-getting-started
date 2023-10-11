/**
 * Fichier de constantes de routing
 * (améliore la maintenabilité car met à jour toutes les occurences en cas de changement de nom de route)
 * NOTE : Object.freeze est une façon de créer un "objet constant" et est donc tout à fait indiqué pour créer un fichier de constantes
 */
export const AppRoutingConstantes = Object.freeze({
  ROUTE_UTILISATEURS: 'utilisateurs',
  ROUTE_LOGIN: 'login,'
});