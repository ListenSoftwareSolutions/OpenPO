using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace OpenPO3
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Orders_WebApi",
                routeTemplate: "orders/api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            /*
            config.Routes.MapHttpRoute(
              name: "AddressBook_WebApi",
              routeTemplate: "addressbook/api/{controller}/{id}",
              defaults: new { id = RouteParameter.Optional }
          );
          */

        }
    }
}
