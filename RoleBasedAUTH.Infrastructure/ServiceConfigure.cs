using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoleBasedAUTH.Infrastructure
{
    public class ServiceConfigure(IConfiguration configuration)
    {
        private readonly IConfiguration _configuration = configuration;

        public string GetKey() => _configuration.GetValue<string>("Jwt:Key")!;
        public string GetIssuer() => _configuration.GetValue<string>("Jwt:Issuer")!;
        public string GetAudience() => _configuration.GetValue<string>("Jwt:Audience")!;
        public string GetSubject() => _configuration.GetValue<string>("Jwt:Subject")!;

    }
}
