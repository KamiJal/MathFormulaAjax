using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MathFormulaAjax.Models;

namespace MathFormulaAjax.ViewModels
{
    public class MathFormulaViewModel
    {
        public string Type { get; set; }
        public int Id { get; set; }

        public List<IndependentVariable> IndependentVariables { get; set; }
        public List<Response> Responses { get; set; }
        public List<MathFunction> MathFunctions { get; set; }

        public MathFormulaViewModel()
        {
            using (var context = new ApplicationDbContext())
            {
                IndependentVariables = context.IndependentVariables.ToList();
                Responses = context.Responses.ToList();
                MathFunctions = context.MathFunctions.ToList();
            }
        }

        public string GetValue()
        {
            if (Type == null || Id == 0) return String.Empty;

            using (var context = new ApplicationDbContext())
            {
                switch (Type)
                {
                    case "IV": return context.IndependentVariables.SingleOrDefault(q => q.Id == Id)?.Value ?? String.Empty;
                    case "R": return context.Responses.SingleOrDefault(q => q.Id == Id)?.Value ?? String.Empty;
                    case "MF": return context.MathFunctions.SingleOrDefault(q => q.Id == Id)?.Value ?? String.Empty;
                    default: return String.Empty;
                }
            }

        }

    }
}