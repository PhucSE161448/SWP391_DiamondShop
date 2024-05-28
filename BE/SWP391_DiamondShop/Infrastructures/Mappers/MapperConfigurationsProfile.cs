
using AutoMapper;
using Application.Commons;
using Domain.Model;
using Application.ViewModels.Cuts;
using Application.ViewModels.Clarities;
using Application.ViewModels.CaratWeights;
using Application.ViewModels.Origins;

namespace Infrastructures.Mappers
{
    public class MapperConfigurationsProfile : Profile
    {
        public MapperConfigurationsProfile()
        {
            CreateMap(typeof(Pagination<>), typeof(Pagination<>));
          
            CreateMap<Cut, CutDTO>().ReverseMap();
            CreateMap<CutDTO, UpsertCutDTO>().ReverseMap();
            CreateMap<Cut, UpsertCutDTO>().ReverseMap();

            CreateMap<Clarity, ClarityDTO>().ReverseMap();
            CreateMap<ClarityDTO, UpsertClarityDTO>().ReverseMap();
            CreateMap<Clarity, UpsertClarityDTO>().ReverseMap();

            CreateMap<CaratWeight, CaratWeightDTO>().ReverseMap();
            CreateMap<CaratWeightDTO, UpsertCaratWeightDTO>().ReverseMap();
            CreateMap<CaratWeight, UpsertCaratWeightDTO>().ReverseMap();

            CreateMap<Origin, OriginDTO>().ReverseMap();
            CreateMap<OriginDTO, UpsertOriginDTO>().ReverseMap();
            CreateMap<Origin, UpsertOriginDTO>().ReverseMap();
        }
    }
}
