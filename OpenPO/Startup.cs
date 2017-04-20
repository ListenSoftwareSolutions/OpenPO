using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.Extensions.DependencyInjection;
using OpenPO.Services;

[assembly: OwinStartup(typeof(OpenPO.Startup))]

namespace OpenPO
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
      
      
            ConfigureAuth(app);
        }
        public void ConfigureServices(IServiceCollection services)
        {
          

            services.AddTransient<IAddressBookRepository, AddressBookRepository>();
        }

      
    }
}
