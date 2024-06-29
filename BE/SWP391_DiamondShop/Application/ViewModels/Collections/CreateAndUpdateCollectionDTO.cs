using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels.Collections;

public class CreateAndUpdateCollectionDTO
{
    [Required]
    public string Name { get; set; }
}