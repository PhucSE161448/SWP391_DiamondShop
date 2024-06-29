using Application.ViewModels.Collections;

namespace Application.Interfaces.Collections;

public interface ICollectionService
{
    Task<CollectionDTO> AddCollection(CreateAndUpdateCollectionDTO addCollectionDto);
    Task<CollectionDTO?> GetCollectionById(int id);
    Task UpdateCollection(int id, CreateAndUpdateCollectionDTO updateCollectionDto);
    Task<List<CollectionDTO>> GetAllCollection();
    Task DeleteOrEnable(int collectionId, bool isDeleted);
}