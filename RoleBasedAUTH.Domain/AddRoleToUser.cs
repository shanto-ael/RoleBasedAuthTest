﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoleBasedAUTH.Domain
{
    public class AddRoleToUser
    {
        public string UserId { get; set; }
        public List<int> RoleIds { get; set; }
    }
}
