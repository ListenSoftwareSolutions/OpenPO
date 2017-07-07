using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Microsoft.Practices.Unity;
using OpenPO.Services;
using OpenPO.Resolver;

namespace OpenPO
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();
            container.RegisterType<IAddressBookRepository, AddressBookRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IAcctRecRepository, AccountReceivableRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IPOQuoteRepository, POQuoteRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IPurchaseOrderRepository, PurchaseOrderRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IUDCRepository, UDCRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
              name: "DefaultApi",
              routeTemplate: "api/{controller}/{id}",
              defaults: new { id = RouteParameter.Optional }
          );
         

            config.Routes.MapHttpRoute(
                name: "AddressBookApi",
                routeTemplate: "api/{controller}/{action}/{email}/"
                , defaults: new
                {
                    email = RouteParameter.Optional
                });

            config.Routes.MapHttpRoute(
                name: "UDCApi",
                routeTemplate: "api/{controller}/{action}/{product_code}"
                , defaults: new
                {
                    product_code = RouteParameter.Optional
                });





        }
    }
}
