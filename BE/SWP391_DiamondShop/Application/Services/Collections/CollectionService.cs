using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.Collections;
using Application.ViewModels.Collections;
using Domain.Model;
using Mapster;

namespace Application.Services.Collections;

public class CollectionService : ICollectionService
{
    private readonly IUnitOfWork _unitOfWork;
    public CollectionService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<CollectionDTO> AddCollection(CreateAndUpdateCollectionDTO addCollectionDto)
    {
        var collection = addCollectionDto.Adapt<Collection>();
        await _unitOfWork.CollectionRepo.AddAsync(collection);
        await _unitOfWork.SaveChangeAsync();
        return collection.Adapt<CollectionDTO>();
    }

    public async Task<CollectionDTO?> GetCollectionById(int id)
    {
        var collection = await _unitOfWork.CollectionRepo.GetAsync(x => x.Id == id);
        if (collection is null)
        {
            throw new NotFoundException("Collection is not existed");
        }

        return collection.Adapt<CollectionDTO>();
    }

    public async Task UpdateCollection(int id, CreateAndUpdateCollectionDTO updateCollectionDto)
    {
        var collection = await _unitOfWork.CollectionRepo.GetByIdAsync(id);
        if (collection is null)
        {
            throw new NotFoundException("Collection is not existed");
        }
        _unitOfWork.CollectionRepo.Update(updateCollectionDto.Adapt(collection));
        await _unitOfWork.SaveChangeAsync();
    }

    public async Task<List<CollectionDTO>> GetAllCollection()
    {
        var collections = await _unitOfWork.CollectionRepo.GetAllAsync();
        return collections.Adapt<List<CollectionDTO>>();
    }

    public async Task DeleteOrEnable(int collectionId, bool isDeleted)
    {
        var collection = await _unitOfWork.CollectionRepo.GetAsync(d => d.Id == collectionId);
        if (collection is null)
        {
            throw new NotFoundException("Collection is not existed");
        }
        collection.IsDeleted = isDeleted;
        await _unitOfWork.SaveChangeAsync();
    }
}